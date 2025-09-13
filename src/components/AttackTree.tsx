import React, { useState, useCallback, useEffect, useRef } from 'react';
import Tree, { RawNodeDatum, TreeNodeDatum, CustomNodeElementProps } from 'react-d3-tree';
import { TreeNode } from '../types/attack';
import { Box, Paper, Typography, List, ListItem, ListItemText, Fade, CircularProgress } from '@mui/material';
import { fetchMitreData } from '../utils/mitreFetch';
import '../styles/tree.css';
import * as d3 from 'd3';

interface AttackTreeProps {
  initialData?: TreeNode;
}

// Extend the TreeNode interface to include __rd3t property
interface ExtendedTreeNode extends TreeNode {
  __rd3t?: {
    collapsed: boolean;
  };
}

interface CustomNodeDatum extends TreeNodeDatum {
  id: string;
  data?: {
    type: 'enterprise' | 'ics' | 'tactic' | 'technique';
    description?: string;
    techniques?: any[];
    detectionMethods?: any[];
    dataSources?: string[];
  };
  x?: number;
  y?: number;
  _children?: CustomNodeDatum[]; // Store original children before modification
}

const AttackTree: React.FC<AttackTreeProps> = ({ initialData }) => {
  const [treeData, setTreeData] = useState<ExtendedTreeNode | null>(initialData || null);
  const [selectedNode, setSelectedNode] = useState<CustomNodeDatum | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(!initialData);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 100, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [nodeRowLimit, setNodeRowLimit] = useState(14); // Maximum nodes in a single column before wrapping

  useEffect(() => {
    if (!initialData) {
      fetchMitreData()
        .then(data => {
          // Process the data to implement multi-row layout
          const processedData = processTreeData(data as ExtendedTreeNode);
          setTreeData(processedData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading MITRE data:', error);
          setLoading(false);
        });
    } else {
      // Process the initial data to implement multi-row layout
      const processedData = processTreeData(initialData as ExtendedTreeNode);
      setTreeData(processedData);
    }
  }, [initialData]);

  // Process tree data to implement multi-row layout when needed
  const processTreeData = useCallback((node: ExtendedTreeNode): ExtendedTreeNode => {
    // Deep clone the node to avoid modifying the original
    const processedNode = { ...node };
    
    // Process children if they exist
    if (processedNode.children && processedNode.children.length > 0) {
      // First, recursively process all children
      processedNode.children = processedNode.children.map(child => 
        processTreeData(child as ExtendedTreeNode)
      );
      
      // If there are too many children (more than nodeRowLimit), reorganize them
      if (processedNode.children.length > nodeRowLimit) {
        // Store original children for reference
        (processedNode as any)._children = [...processedNode.children];
        
        // Calculate how many rows we need
        const numRows = Math.ceil(processedNode.children.length / nodeRowLimit);
        const nodesPerRow = Math.ceil(processedNode.children.length / numRows);
        
        // Create new structure with intermediate nodes for each row
        const newChildren: ExtendedTreeNode[] = [];
        
        for (let row = 0; row < numRows; row++) {
          // Create a row node
          const startIdx = row * nodesPerRow;
          const endIdx = Math.min(startIdx + nodesPerRow, processedNode.children.length);
          
          // Get first and last node names for this row
          const firstNodeName = processedNode.children[startIdx].name;
          const lastNodeName = processedNode.children[endIdx - 1].name;
          
          const rowNode: ExtendedTreeNode = {
            id: `${processedNode.id || 'row'}-row-${row}`,
            name: `${firstNodeName} → ${lastNodeName}`,
            children: [],
            data: {
              type: 'tactic', // Use tactic style for row nodes
              description: `Row ${row + 1} containing nodes from ${firstNodeName} to ${lastNodeName}`
            }
          };
          
          // Add children to this row
          for (let i = startIdx; i < endIdx; i++) {
            rowNode.children!.push(processedNode.children[i]);
          }
          
          // Only add row node if it has children
          if (rowNode.children!.length > 0) {
            newChildren.push(rowNode);
          }
        }
        
        // Replace children with the new row-based structure
        processedNode.children = newChildren;
      }
    }
    
    return processedNode;
  }, [nodeRowLimit]);

  useEffect(() => {
    if (treeContainerRef.current) {
      const { width, height } = treeContainerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: 100, y: height / 2 });
    }
  }, []);

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const { width, height } = node.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: 100, y: height / 2 });
    }
  }, []);

  const adjustTreeView = useCallback(() => {
    if (!treeContainerRef.current) return;

    const treeContainer = treeContainerRef.current;
    const containerRect = treeContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Get all nodes
    const nodes = treeContainer.querySelectorAll('.rd3t-node');
    if (nodes.length === 0) return;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    nodes.forEach(node => {
      const rect = node.getBoundingClientRect();
      minX = Math.min(minX, rect.left);
      maxX = Math.max(maxX, rect.right);
      minY = Math.min(minY, rect.top);
      maxY = Math.max(maxY, rect.bottom);
    });

    // Calculate the tree dimensions
    const treeWidth = maxX - minX;
    const treeHeight = maxY - minY;

    // Calculate the required scale to fit everything
    const scaleX = (containerWidth - 100) / treeWidth;
    const scaleY = (containerHeight - 100) / treeHeight;
    const newScale = Math.min(scaleX, scaleY, 1);

    // Calculate center position
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Update the transform
    setZoom(newScale);
    setTranslate({
      x: centerX - (treeWidth * newScale) / 2,
      y: centerY
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', adjustTreeView);
    return () => window.removeEventListener('resize', adjustTreeView);
  }, [adjustTreeView]);

  const handleNodeToggle = useCallback((nodeData: CustomNodeDatum & { x: number; y: number }) => {
    // Count orange nodes in the subtree
    const countOrangeNodes = (node: CustomNodeDatum): number => {
      let count = node.data?.type === 'technique' ? 1 : 0;
      if (node.children) {
        node.children.forEach(child => {
          count += countOrangeNodes(child as CustomNodeDatum);
        });
      }
      return count;
    };

    const orangeNodeCount = countOrangeNodes(nodeData);
    const zoomFactor = Math.max(0.5, Math.min(1.5, 1 / (orangeNodeCount / 10)));

    // Get current node position from the DOM element
    const nodeElement = treeContainerRef.current?.querySelector(`[data-id="${nodeData.id}"]`);
    const nodeRect = nodeElement?.getBoundingClientRect();
    const containerRect = treeContainerRef.current?.getBoundingClientRect();

    if (nodeRect && containerRect) {
      // Calculate relative position
      const relativeX = nodeRect.left - containerRect.left + nodeRect.width / 2;
      const relativeY = nodeRect.top - containerRect.top + nodeRect.height / 2;

      // Animate zoom
      d3.select(treeContainerRef.current)
        .transition()
        .duration(750)
        .tween('zoom', () => {
          const interpolateZoom = d3.interpolate(zoom, zoomFactor);
          const interpolateTranslate = d3.interpolate(translate, {
            x: dimensions.width / 2 - relativeX * zoomFactor,
            y: dimensions.height / 2 - relativeY * zoomFactor
          });
          return (t: number) => {
            setZoom(interpolateZoom(t));
            setTranslate(interpolateTranslate(t));
          };
        });
    }

    setTimeout(adjustTreeView, 750);
  }, [adjustTreeView, dimensions, translate, zoom]);

  const applyZoomEffect = useCallback((node: any) => {
    const numChildren = node.children?.length ?? 0;
    const zoomFactor = Math.max(0.5, Math.min(1.0, 1.0 / (numChildren / 10.0)));

    // Ensure node position is accessed correctly
    const nodeX = node.x ?? 0; 
    const nodeY = node.y ?? 0; 

    // Calculate the center position for the node
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Update the transform to center the node and its children
    setZoom(zoomFactor);
    setTranslate({
      x: centerX - (nodeX * zoomFactor),
      y: centerY - (nodeY * zoomFactor)
    });
  }, [dimensions]);

  const onNodeClick = useCallback((nodeData: any) => {
    const typedNodeData = nodeData as CustomNodeDatum;
    setSelectedNode(typedNodeData);
    applyZoomEffect(typedNodeData);
    setTimeout(adjustTreeView, 100);
  }, [applyZoomEffect, adjustTreeView]);

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps
  }: {
    nodeDatum: CustomNodeDatum;
    toggleNode: () => void;
    foreignObjectProps: any;
  }) => {
    // Check if this is a row node (created for multi-row layout)
    const isRowNode = isRowNodeType(nodeDatum);
    const nodeData = nodeDatum as unknown as ExtendedTreeNode;
    
    // Determine node type class
    let nodeTypeClass = 'rd3t-node';
    if (isRowNode) {
      nodeTypeClass += ' row-node';
    } else if (nodeDatum.data?.type === 'enterprise') {
      nodeTypeClass += ' enterprise-node';
    } else if (nodeDatum.data?.type === 'tactic') {
      nodeTypeClass += ' tactic-node';
    } else if (nodeDatum.data?.type === 'technique') {
      nodeTypeClass += ' technique-node';
    } else if (nodeDatum.data?.type === 'ics') {
      nodeTypeClass += ' ics-node';
    }
    
    return (
    <g className={nodeTypeClass}>
      <circle 
        r={15} 
        onClick={toggleNode}
        style={{ cursor: 'pointer' }}
      />
      {(nodeDatum.children?.length ?? 0) > 0 && (
        <>
          <text
            x={0}
            y={0}
            className="node-indicator"
            onClick={toggleNode}
          >
            {nodeData.__rd3t?.collapsed ? '+' : '-'}
          </text>
          {!nodeData.__rd3t?.collapsed && (
            <path
              d={`M30,0 H${isRowNode ? '60' : nodeDatum.data?.type === 'tactic' ? '120' : '60'}`}
              stroke="#0071bc"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            />
          )}
        </>
      )}
      <foreignObject {...foreignObjectProps}>
        <Box
          sx={{
            p: 1.5,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() => setSelectedNode(nodeDatum)}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: isRowNode ? 'bold' : 'medium',
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
              color: '#000000',
            }}
          >
            {getNodeEmoji(nodeDatum)} {nodeDatum.name}
          </Typography>
        </Box>
      </foreignObject>
    </g>
    );
  };

  const getNodeEmoji = (node: CustomNodeDatum) => {
    // For row nodes
    if (isRowNodeType(node)) {
      return '📑';
    }

    // For main categories
    switch (node.data?.type) {
      case 'enterprise':
        return '🏢';
      case 'ics':
        return '🏭';
      case 'tactic':
        // Specific emojis for different tactics
        const tacticName = node.name.toLowerCase();
        if (tacticName.includes('initial access')) return '🚪';
        if (tacticName.includes('execution')) return '▶️';
        if (tacticName.includes('persistence')) return '🔄';
        if (tacticName.includes('privilege escalation')) return '🔑';
        if (tacticName.includes('defense evasion')) return '🛡️';
        if (tacticName.includes('credential')) return '🔐';
        if (tacticName.includes('discovery')) return '🔍';
        if (tacticName.includes('lateral movement')) return '↔️';
        if (tacticName.includes('collection')) return '📊';
        if (tacticName.includes('command and control')) return '📡';
        if (tacticName.includes('exfiltration')) return '📤';
        if (tacticName.includes('impact')) return '💥';
        if (tacticName.includes('reconnaissance')) return '👁️';
        if (tacticName.includes('resource')) return '⚙️';
        if (tacticName.includes('inhibit')) return '🛑';
        if (tacticName.includes('impair')) return '⚠️';
        return '📈'; // Default for other tactics
      case 'technique':
        // Specific emojis for different technique categories
        const techName = node.name.toLowerCase();
        if (techName.includes('phish')) return '🎣';
        if (techName.includes('malware') || techName.includes('virus')) return '🦠';
        if (techName.includes('exploit')) return '💣';
        if (techName.includes('bypass')) return '🔓';
        if (techName.includes('encrypt')) return '🔒';
        if (techName.includes('steal') || techName.includes('theft')) return '🕵️';
        if (techName.includes('brute force')) return '🔨';
        if (techName.includes('scan')) return '📡';
        if (techName.includes('spoof')) return '🎭';
        if (techName.includes('hijack')) return '🏴‍☠️';
        if (techName.includes('denial') || techName.includes('dos')) return '⛔';
        if (techName.includes('backdoor')) return '🚪';
        if (techName.includes('remote')) return '📱';
        if (techName.includes('script')) return '📜';
        if (techName.includes('data')) return '💾';
        if (techName.includes('network')) return '🌐';
        if (techName.includes('password')) return '🔑';
        if (techName.includes('account')) return '👤';
        if (techName.includes('admin')) return '👑';
        return '💻'; // Default for other techniques
      default:
        return '';
    }
  };

  // Helper function to check if a node is a row node
  const isRowNodeType = (node: CustomNodeDatum): boolean => {
    return node.id !== undefined && node.id.includes('-row-');
  };

  const renderNodeInfo = (node: CustomNodeDatum) => {
    // For row nodes, show information about the original parent's children
    if (isRowNodeType(node)) {
      const extendedNode = node as unknown as ExtendedTreeNode & { _children?: ExtendedTreeNode[] };
      const parentId = node.id?.split('-row-')[0];
      
      return (
        <Fade in>
          <Paper sx={{ 
            p: 3, 
            maxHeight: '100%', 
            overflow: 'auto',
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#fafafa'
          }}>
            <Typography variant="h5" color="primary" gutterBottom>
              {node.name}
            </Typography>
            <Typography variant="body1" paragraph>
              This row contains {node.children?.length || 0} nodes from parent node {parentId}.
            </Typography>
            <Box mt={2}>
              <Typography variant="h6" color="textSecondary">Nodes in this row</Typography>
              <List>
                {node.children?.map((child: any) => (
                  <ListItem key={child.id} sx={{ 
                    backgroundColor: '#fff',
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1
                  }}>
                    <ListItemText
                      primary={child.name}
                      secondary={child.data?.description || ''}
                      primaryTypographyProps={{ color: 'primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Fade>
      );
    }
    
    if (!node.data) return null;

    return (
      <Fade in>
        <Paper sx={{ 
          p: 3, 
          maxHeight: '100%', 
          overflow: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fafafa'
        }}>
          <Typography variant="h5" color="primary" gutterBottom>
            {node.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            ID: {node.id}
          </Typography>
          {node.data.description && (
            <Box mt={2}>
              <Typography variant="h6" color="textSecondary">Description</Typography>
              <Typography variant="body1">{node.data.description}</Typography>
            </Box>
          )}
          {node.data.techniques && node.data.techniques.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" color="textSecondary">Associated Techniques</Typography>
              <List>
                {node.data.techniques.map((technique) => (
                  <ListItem key={technique.id} sx={{ 
                    backgroundColor: '#fff',
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1
                  }}>
                    <ListItemText
                      primary={`${technique.id} - ${technique.name}`}
                      secondary={technique.description}
                      primaryTypographyProps={{ color: 'primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          {node.data.detectionMethods && node.data.detectionMethods.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" color="textSecondary">Detection Methods</Typography>
              <List>
                {node.data.detectionMethods.map((method) => (
                  <ListItem key={method.id} sx={{ 
                    backgroundColor: '#fff',
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1
                  }}>
                    <ListItemText
                      primary={method.name}
                      secondary={method.description}
                      primaryTypographyProps={{ color: 'primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          {node.data.dataSources && node.data.dataSources.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" color="textSecondary">Data Sources</Typography>
              <List>
                {node.data.dataSources.map((source, index) => (
                  <ListItem key={index} sx={{ 
                    backgroundColor: '#fff',
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1
                  }}>
                    <ListItemText primary={source} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Fade>
    );
  };

  const hasMultiRowLayout = (node: ExtendedTreeNode): boolean => {
    if (node.children && node.children.length > nodeRowLimit) {
      return true;
    }
    if (node.children) {
      for (const child of node.children) {
        if (hasMultiRowLayout(child as ExtendedTreeNode)) {
          return true;
        }
      }
    }
    return false;
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: '#fff'
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading MITRE ATT&CK data...
        </Typography>
      </Box>
    );
  }

  if (!treeData) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: '#fff'
        }}
      >
        <Typography variant="h6" color="error">
          Error loading MITRE ATT&CK data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        bgcolor: '#fff',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }} 
      ref={containerRef}
    >
      <Box 
        sx={{ 
          width: '70%', 
          height: '100%', 
          position: 'relative',
          overflow: 'hidden'
        }} 
        ref={treeContainerRef}
        className={treeData && hasMultiRowLayout(treeData) ? 'rd3t-tree-container multi-row' : 'rd3t-tree-container'}
      >
        <Tree
          data={treeData as unknown as RawNodeDatum}
          orientation="horizontal"
          pathFunc="diagonal"
          translate={translate}
          zoom={zoom}
          nodeSize={{ x: 450, y: 60 }}
          separation={{ siblings: 1.2, nonSiblings: 1.5 }}
          onNodeClick={onNodeClick}
          renderCustomNodeElement={(rd3tProps: any) =>
            renderForeignObjectNode({
              ...rd3tProps,
              foreignObjectProps: {
                width: rd3tProps.nodeDatum.id && rd3tProps.nodeDatum.id.includes('-row-') ? 240 : 160,
                height: 35,
                x: rd3tProps.nodeDatum.id && rd3tProps.nodeDatum.id.includes('-row-') ? 25 : 
                   rd3tProps.nodeDatum.data?.type === 'technique' ? 120 : 25,
                y: -17,
              },
            })
          }
          collapsible={true}
          enableLegacyTransitions={true}
          transitionDuration={800}
          zoomable={false}
          initialDepth={1}
        />
      </Box>
      <Box sx={{ 
        width: '30%', 
        p: 3,
        bgcolor: '#fff',
        borderLeft: '1px solid #e0e0e0',
        overflowY: 'auto',
        height: '100%',
        position: 'relative'
      }}>
        {selectedNode && renderNodeInfo(selectedNode)}
        {!selectedNode && (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
            Select a node to view its details
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AttackTree;

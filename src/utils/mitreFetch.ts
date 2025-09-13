import axios from 'axios';
import { TreeNode } from '../types/attack';

const MITRE_ENTERPRISE_URL = 'https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json';
const MITRE_ICS_URL = 'https://raw.githubusercontent.com/mitre/cti/master/ics-attack/ics-attack.json';

export async function fetchMitreData(): Promise<TreeNode> {
  try {
    // Fetch both Enterprise and ICS data
    const [enterpriseResponse, icsResponse] = await Promise.all([
      axios.get(MITRE_ENTERPRISE_URL),
      axios.get(MITRE_ICS_URL)
    ]);
    
    // Process Enterprise data
    const enterpriseData = enterpriseResponse.data;
    const enterpriseTree = processMatrixData(enterpriseData, 'Enterprise', 'enterprise');
    
    // Process ICS data
    const icsData = icsResponse.data;
    const icsTree = processMatrixData(icsData, 'ICS', 'ics');
    
    // Create a root node with both trees as children
    const rootNode: TreeNode = {
      name: 'MITRE ATT&CK',
      id: 'mitre-root',
      data: {
        type: 'enterprise', // Using enterprise type for the root
        description: 'MITRE ATT&CK Framework'
      },
      children: [enterpriseTree, icsTree]
    };
    
    return rootNode;
  } catch (error) {
    console.error('Error fetching MITRE data:', error);
    throw error;
  }
}

// Helper function to process matrix data (Enterprise or ICS)
function processMatrixData(data: any, name: string, type: 'enterprise' | 'ics'): TreeNode {
  // Extract tactics
  const tactics = data.objects.filter((obj: any) => 
    obj.type === 'x-mitre-tactic'
  );

  // Extract techniques
  const techniques = data.objects.filter((obj: any) => 
    obj.type === 'attack-pattern'
  );

  // Create tree structure
  const treeData: TreeNode = {
    name: name,
    id: type,
    data: {
      type: type,
      description: `MITRE ATT&CK ${name} Matrix`
    },
    children: tactics.map((tactic: any) => ({
      name: tactic.name,
      id: tactic.external_references[0].external_id,
      data: {
        type: 'tactic',
        description: tactic.description,
        techniques: techniques
          .filter((technique: any) => 
            technique.kill_chain_phases?.some((phase: any) => 
              phase.phase_name === tactic.x_mitre_shortname
            )
          )
          .map((technique: any) => ({
            id: technique.external_references[0].external_id,
            name: technique.name,
            description: technique.description,
            detectionMethods: technique.x_mitre_detection ? [{
              id: `${technique.external_references[0].external_id}-detection`,
              name: 'Detection Strategy',
              description: technique.x_mitre_detection
            }] : [],
            dataSources: technique.x_mitre_data_sources || []
          }))
      },
      children: techniques
        .filter((technique: any) => 
          technique.kill_chain_phases?.some((phase: any) => 
            phase.phase_name === tactic.x_mitre_shortname
          )
        )
        .map((technique: any) => ({
          name: technique.name,
          id: technique.external_references[0].external_id,
          data: {
            type: 'technique',
            description: technique.description,
            detectionMethods: technique.x_mitre_detection ? [{
              id: `${technique.external_references[0].external_id}-detection`,
              name: 'Detection Strategy',
              description: technique.x_mitre_detection
            }] : [],
            dataSources: technique.x_mitre_data_sources || []
          }
        }))
    }))
  };

  return treeData;
}

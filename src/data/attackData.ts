import { TreeNode } from '../types/attack';

export const attackTreeData: TreeNode = {
  name: 'Enterprise',
  id: 'enterprise',
  data: {
    type: 'enterprise',
    description: 'MITRE ATT&CK Enterprise Matrix'
  },
  children: [
    {
      name: 'Reconnaissance',
      id: 'TA0043',
      data: {
        type: 'tactic',
        description: 'The adversary is trying to gather information they can use to plan future operations.',
        mitigations: [
          {
            id: 'M1018',
            name: 'User Training',
            description: 'Train users to be aware of common reconnaissance techniques and how to report suspected reconnaissance activities.'
          }
        ],
        detectionMethods: [
          {
            id: 'DM1001',
            name: 'Network Monitoring',
            description: 'Monitor for suspicious network scanning activities and unauthorized information gathering attempts.'
          }
        ]
      }
    },
    {
      name: 'Resource Development',
      id: 'TA0042',
      data: {
        type: 'tactic',
        description: 'The adversary is trying to establish resources they can use to support operations.',
        mitigations: [
          {
            id: 'M1019',
            name: 'Threat Intelligence Program',
            description: 'Establish a threat intelligence program to track adversary infrastructure development.'
          }
        ],
        detectionMethods: [
          {
            id: 'DM1002',
            name: 'Infrastructure Monitoring',
            description: 'Monitor for suspicious domain registrations and infrastructure setup activities.'
          }
        ]
      }
    }
    // Additional tactics will be added here
  ]
};

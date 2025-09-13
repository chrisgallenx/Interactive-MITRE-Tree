export interface Mitigation {
  id: string;
  name: string;
  description: string;
}

export interface DetectionMethod {
  id: string;
  name: string;
  description: string;
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  mitigations: Mitigation[];
  detectionMethods: DetectionMethod[];
}

export interface Tactic {
  id: string;
  name: string;
  description: string;
  techniques: Technique[];
}

export interface TreeNode {
  name: string;
  id: string;
  children?: TreeNode[];
  data?: {
    type: 'enterprise' | 'ics' | 'tactic' | 'technique';
    description?: string;
    mitigations?: Mitigation[];
    detectionMethods?: DetectionMethod[];
  };
}

export interface RealWorldExample {
  id: string;
  name: string;
  description: string;
  techniqueIds: string[];
  reference: string;
  year: number;
}

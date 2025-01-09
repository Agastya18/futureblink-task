import { Node, Edge } from 'reactflow';

export interface FlowNode extends Node {
  data: {
    label: string;
    type: 'email' | 'delay' | 'source';
    config?: {
      email?: string;
      subject?: string;
      body?: string;
      delay?: number;
    };
  };
}

export interface FlowState {
  nodes: FlowNode[];
  edges: Edge[];
  addNode: (type: 'email' | 'delay' | 'source') => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  saveFlow: () => Promise<void>;
}
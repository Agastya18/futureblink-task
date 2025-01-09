import { create } from 'zustand';
import { Node, addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { FlowState } from '../types/flow';

const API_URL = 'http://localhost:3000';

const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  
  addNode: (type) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: 'custom',
      position: { x: 100, y: 100 },
      data: { 
        label: type.charAt(0).toUpperCase() + type.slice(1),
        type,
        config: {}
      },
    };
    
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge(connection, state.edges),
    }));
  },

  updateNodeData: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    }));
  },

  saveFlow: async () => {
    const { nodes, edges } = get();
    let totalDelay = 0;

    // Calculate total delay by traversing nodes
    for (const node of nodes) {
      if (node.data.type === 'delay' && node.data.config?.delay) {
        totalDelay += node.data.config.delay;
      }
    }

    try {
      const response = await fetch(`${API_URL}/api/save-flow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges, totalDelay }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save flow');
      }
      
      alert('Flow saved successfully!');
    } catch (error) {
      console.error('Error saving flow:', error);
      alert('Failed to save flow. Please try again.');
    }
  },
}));

export default useFlowStore;
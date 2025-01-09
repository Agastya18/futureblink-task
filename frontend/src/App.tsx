import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './components/CustomNode';
import Sidebar from './components/Sidebar';
import useFlowStore from './store/flowStore';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    saveFlow,
  } = useFlowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
        <button
          onClick={saveFlow}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md"
        >
          Save Flow
        </button>
      </div>
    </div>
  );
}

export default App;
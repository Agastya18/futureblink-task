import React from 'react';
import { Mail, Clock, Users } from 'lucide-react';
import useFlowStore from '../store/flowStore';

const Sidebar: React.FC = () => {
  const addNode = useFlowStore((state) => state.addNode);

  const nodeTypes = [
    { type: 'email', label: 'Cold Email', icon: Mail },
    { type: 'delay', label: 'Wait/Delay', icon: Clock },
    { type: 'source', label: 'Lead Source', icon: Users },
  ] as const;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Flow Nodes</h2>
      <div className="space-y-2">
        {nodeTypes.map(({ type, label, icon: Icon }) => (
          <div
            key={type}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => addNode(type)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/reactflow', type);
            }}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
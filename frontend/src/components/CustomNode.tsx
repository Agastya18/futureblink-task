import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Mail, Clock, Users } from 'lucide-react';
import useFlowStore from '../store/flowStore';

interface CustomNodeProps {
  id: string;
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

const CustomNode: React.FC<CustomNodeProps> = ({ id, data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const getIcon = () => {
    switch (data.type) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'delay':
        return <Clock className="w-5 h-5" />;
      case 'source':
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className="font-medium text-sm">{data.label}</span>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="ml-2 text-xs text-blue-500 hover:text-blue-700"
        >
          {isEditing ? 'Close' : 'Edit'}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-2 space-y-2">
          {data.type === 'email' && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={data.config?.email || ''}
                onChange={(e) => updateNodeData(id, { config: { ...data.config, email: e.target.value } })}
                className="w-full px-2 py-1 text-sm border rounded"
              />
              <input
                type="text"
                placeholder="Subject"
                value={data.config?.subject || ''}
                onChange={(e) => updateNodeData(id, { config: { ...data.config, subject: e.target.value } })}
                className="w-full px-2 py-1 text-sm border rounded"
              />
              <textarea
                placeholder="Email body"
                value={data.config?.body || ''}
                onChange={(e) => updateNodeData(id, { config: { ...data.config, body: e.target.value } })}
                className="w-full px-2 py-1 text-sm border rounded"
                rows={3}
              />
            </>
          )}
          {data.type === 'delay' && (
            <input
              type="number"
              placeholder="Delay (min)"
              value={data.config?.delay || ''}
              onChange={(e) => updateNodeData(id, { config: { ...data.config, delay: Number(e.target.value) } })}
              className="w-full px-2 py-1 text-sm border rounded"
            />
          )}
          <button 
            type="submit"
            className="w-full px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default CustomNode;
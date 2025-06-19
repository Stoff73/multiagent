'use client';

import { ChatHeaderProps } from '../types';

export function ChatHeader({ 
  agentType, 
  agentName, 
  agentDescription,
  agentColor 
}: ChatHeaderProps) {
  return (
    <div className={`p-4 border-b ${agentColor} bg-opacity-20`}>
      <h2 className="text-lg font-medium flex items-center">
        <span 
          className={`inline-block w-3 h-3 rounded-full ${agentColor.replace('text-', 'bg-')} mr-2`}
        ></span>
        Chat with {agentName}
      </h2>
      <p className="text-sm text-gray-600 mt-1">{agentDescription}</p>
    </div>
  );
}

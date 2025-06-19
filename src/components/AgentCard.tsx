import React from 'react';

interface AgentCardProps {
  icon: React.ReactNode;
  name: string;
  accentColor?: string;
}

export default function AgentCard({ icon, name, accentColor = '#3b82f6' }: AgentCardProps) {
  return (
    <div
      role="listitem"
      tabIndex={0}
      aria-label={`Agent card for ${name}`}
      className="flex items-center border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="p-4">{icon}</div>
      <div className="flex-1 pr-4">
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
    </div>
  );
}
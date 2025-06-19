import React from 'react';
import AgentCard from './AgentCard';

interface Agent {
  id: string;
  name: string;
  icon: React.ReactNode;
  accentColor?: string;
}

interface DashboardGridProps {
  agents: Agent[];
}

export default function DashboardGrid({ agents }: DashboardGridProps) {
  return (
    <section
      role="list"
      aria-label="Agent dashboard grid"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2"
    >
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          icon={agent.icon}
          name={agent.name}
          accentColor={agent.accentColor}
        />
      ))}
    </section>
  );
}
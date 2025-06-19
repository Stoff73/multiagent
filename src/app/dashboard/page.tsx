import React from 'react';
import DashboardGrid from '../../components/DashboardGrid';

const sampleAgents = [
  { id: 'agent1', name: 'ChatBot', icon: <span style={{fontSize: 32}}>🤖</span>, accentColor: '#3b82f6' },
  { id: 'agent2', name: 'Automation', icon: <span style={{fontSize: 32}}>⚙️</span>, accentColor: '#ef4444' },
  { id: 'agent3', name: 'User Manager', icon: <span style={{fontSize: 32}}>👥</span>, accentColor: '#10b981' },
];

export default function DashboardPage() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>
      <DashboardGrid agents={sampleAgents} />
    </main>
  );
}
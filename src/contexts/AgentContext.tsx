'use client';

import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { 
  UserGroupIcon, 
  CakeIcon, 
  BoltIcon, 
  BriefcaseIcon,
  UserCircleIcon 
} from '@heroicons/react/24/outline';

export type AgentType = 'admin' | 'nutrition' | 'fitness' | 'sme';

interface AgentMetadata {
  id: AgentType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AgentContextType {
  // Current active agent
  activeAgent: AgentType | null;
  // Set the active agent
  setActiveAgent: (agent: AgentType | null) => void;
  // Get metadata for the current agent
  agentMetadata: AgentMetadata | null;
  // Get metadata for all agents
  allAgents: Record<AgentType, AgentMetadata>;
  // Get metadata for a specific agent
  getAgentMetadata: (agentId: AgentType) => AgentMetadata;
  // Current agent type (for backward compatibility)
  agentType: AgentType | null;
}

// Define all agent metadata
const AGENTS_METADATA: Record<AgentType, AgentMetadata> = {
  admin: {
    id: 'admin',
    name: 'Admin Assistant',
    description: 'Schedule and communications',
    icon: UserGroupIcon,
  },
  nutrition: {
    id: 'nutrition',
    name: 'Nutrition Coach',
    description: 'Meal planning and diet',
    icon: CakeIcon,
  },
  fitness: {
    id: 'fitness',
    name: 'Fitness Coach',
    description: 'Workouts and activity',
    icon: BoltIcon,
  },
  sme: {
    id: 'sme',
    name: 'Business Coach',
    description: 'Business growth and tasks',
    icon: BriefcaseIcon,
  },
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);

  const value = useMemo(() => ({
    activeAgent,
    agentType: activeAgent, // For backward compatibility
    setActiveAgent,
    agentMetadata: activeAgent ? AGENTS_METADATA[activeAgent] : null,
    allAgents: AGENTS_METADATA,
    getAgentMetadata: (agentId: AgentType) => AGENTS_METADATA[agentId],
  }), [activeAgent]);

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}

// Helper hook to access agent metadata
export function useAgentMetadata(agentId: AgentType) {
  const { getAgentMetadata } = useAgent();
  return getAgentMetadata(agentId);
}

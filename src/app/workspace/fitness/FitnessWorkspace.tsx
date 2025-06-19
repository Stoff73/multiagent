'use client';

import AgentChatPage from '@/components/workspace/AgentChatPage';

export default function FitnessWorkspace() {
  return (
    <AgentChatPage 
      agentType="fitness" 
      greeting="Hello! I'm your fitness coach. Ready for a great workout?"
    />
  );
}

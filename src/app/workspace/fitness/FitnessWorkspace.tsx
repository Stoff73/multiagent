'use client';

import { AgentChatPage } from '@/components/chat';

export default function FitnessWorkspace() {
  return (
    <AgentChatPage 
      agentType="fitness" 
      greeting="Hello! I'm your fitness coach. Ready for a great workout?"
    />
  );
}

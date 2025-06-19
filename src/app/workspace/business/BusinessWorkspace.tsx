'use client';

import AgentChatPage from '@/components/workspace/AgentChatPage';

export default function BusinessWorkspace() {
  return (
    <AgentChatPage 
      agentType="sme" 
      greeting="Hello! I'm your business assistant. How can I help you today?"
    />
  );
}

'use client';

import AgentChatPage from '@/components/workspace/AgentChatPage';

export default function SmeWorkspace() {
  return (
    <AgentChatPage 
      agentType="sme" 
      greeting="Hello! I'm your business consultant. How can I assist you today?"
    />
  );
}

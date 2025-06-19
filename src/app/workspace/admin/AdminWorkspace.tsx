'use client';

import AgentChatPage from '@/components/workspace/AgentChatPage';

export default function AdminWorkspace() {
  return (
    <AgentChatPage 
      agentType="admin" 
      greeting="Hello! I'm your admin assistant. How can I help you today?"
    />
  );
}

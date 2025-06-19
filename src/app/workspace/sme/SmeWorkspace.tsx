'use client';

import { AgentChatPage } from '@/components/chat';

export default function SmeWorkspace() {
  return (
    <AgentChatPage 
      agentType="sme" 
      greeting="Hello! I'm your business consultant. How can I assist you today?"
    />
  );
}

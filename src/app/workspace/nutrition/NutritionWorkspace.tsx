'use client';

import AgentChatPage from '@/components/workspace/AgentChatPage';

export default function NutritionWorkspace() {
  return (
    <AgentChatPage 
      agentType="nutrition" 
      greeting="Hello! I'm your nutrition coach. What would you like to eat today?"
    />
  );
}

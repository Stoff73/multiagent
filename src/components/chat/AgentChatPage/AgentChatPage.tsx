'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { Message } from '@/hooks/useChat';
import { AgentType } from '@/contexts/AgentContext';
import { ChatHeader } from '../ChatHeader/ChatHeader';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import { ChatInput } from '../ChatInput/ChatInput';
import { AGENT_COLORS, AGENT_NAMES, AGENT_DESCRIPTIONS } from '../constants';
import { AgentChatPageProps } from '../types';

export function AgentChatPage({ agentType, greeting }: AgentChatPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState('');
  
  const initialMessages: Message[] = [{
    id: 'welcome',
    role: 'assistant',
    content: greeting || `Hello! I'm your ${AGENT_NAMES[agentType]}. How can I help you today?`,
    timestamp: new Date()
  }];
  
  const { messages, sendMessage, isLoading, error } = useChat(initialMessages);
  
  const agentColor = AGENT_COLORS[agentType].text;
  const agentName = AGENT_NAMES[agentType];
  const agentDescription = AGENT_DESCRIPTIONS[agentType];
  
  // Handle authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const currentInput = input;
    setInput('');

    try {
      await sendMessage(currentInput, { agent: agentType });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <ChatHeader 
        agentType={agentType}
        agentName={agentName}
        agentDescription={agentDescription}
        agentColor={agentColor}
      />
      
      <ChatMessages 
        messages={messages}
        agentColor={AGENT_COLORS[agentType].bg}
      />
      
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useChat, Message } from '@/hooks/useChat';
import { AgentType } from '@/contexts/AgentContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

// Message type is now imported from useChat

const AGENT_COLORS: Record<AgentType, { bg: string; text: string; border: string }> = {
  admin: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200'
  },
  nutrition: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  fitness: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200'
  },
  sme: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200'
  }
};

const AGENT_NAMES: Record<AgentType, string> = {
  admin: 'Admin Assistant',
  nutrition: 'Nutrition Coach',
  fitness: 'Fitness Coach',
  sme: 'Business Coach'
};

const AGENT_DESCRIPTIONS: Record<AgentType, string> = {
  admin: 'Helping you manage schedules and communications',
  nutrition: 'Providing meal planning and healthy eating advice',
  fitness: 'Guiding you through workouts and fitness plans',
  sme: 'Assisting with business growth and strategy'
};

interface AgentChatPageProps {
  agentType: AgentType;
  greeting?: string;
}

export default function AgentChatPage({ agentType, greeting }: AgentChatPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const initialMessages: Message[] = [{
    id: 'welcome',
    role: 'assistant',
    content: greeting || `Hello! I'm your ${AGENT_NAMES[agentType]}. How can I help you today?`,
    timestamp: new Date()
  }];
  
  const { messages, sendMessage, isLoading, error, setMessages } = useChat(initialMessages);
  
  // Track the current agent type
  const [currentAgent, setCurrentAgent] = useState<AgentType>(agentType);
  
  const { bg: agentBg, text: agentText, border: agentBorder } = AGENT_COLORS[agentType];
  const agentName = AGENT_NAMES[agentType];
  const agentDescription = AGENT_DESCRIPTIONS[agentType];
  
  // Helper function to update messages with proper typing
  const updateMessages = (updater: (prev: Message[]) => Message[]) => {
    setMessages(updater);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const currentInput = input;
    setInput('');

    try {
      // Send the message with the current agent context
      await sendMessage(currentInput, { agent: currentAgent });
    } catch (error) {
      console.error('Error getting response:', error);
      // Error handling is now done in the useChat hook
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`p-4 border-b ${agentBorder} ${agentBg}`}>
        <h2 className="text-lg font-medium flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full ${agentText.replace('text-', 'bg-')} mr-2`}></span>
          Chat with {agentName}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{agentDescription}</p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : `${agentBg} ${agentText} rounded-bl-none`
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs opacity-70 mt-1 ${message.role === 'user' ? 'text-blue-100' : 'opacity-60'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`${agentBg} ${agentText} rounded-lg rounded-bl-none px-4 py-2`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-current opacity-70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-current opacity-70 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-current opacity-70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Message ${agentName}...`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <PaperAirplaneIcon className="h-5 w-5 mr-1" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}

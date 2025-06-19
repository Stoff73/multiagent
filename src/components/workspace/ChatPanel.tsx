'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useAgent } from '@/contexts/AgentContext';
import { AgentType } from '@/contexts/AgentContext';
import { useChatApi } from '@/hooks/useChatApi';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const AGENT_GREETINGS: Record<AgentType, string> = {
  admin: "Hello! I'm your Admin Assistant. How can I help you manage your schedule and communications today?",
  nutrition: "Hi there! I'm your Nutrition Coach. Ready to help with meal planning and healthy eating tips. What would you like to know?",
  fitness: "Hello! I'm your Fitness Coach. Whether it's workout plans or fitness advice, I'm here to help. What's your goal today?",
  sme: "Hello! I'm your Business Coach. How can I assist you with growing your business today?"
};

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

export default function ChatPanel() {
  const { activeAgent, agentMetadata } = useAgent();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, isLoading, error: chatError } = useChatApi();

  // Initialize chat with greeting when agent changes
  useEffect(() => {
    if (!activeAgent) return;
    
    const greeting: Message = {
      id: 'welcome',
      role: 'assistant',
      content: AGENT_GREETINGS[activeAgent],
      timestamp: new Date()
    };
    
    setMessages([greeting]);
    
    // Load chat history from localStorage if available
    const savedChat = localStorage.getItem(`chat_${activeAgent}`);
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
    
    // Focus input when agent changes
    inputRef.current?.focus();
  }, [activeAgent]);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    if (!activeAgent || messages.length <= 1) return; // Don't save just the greeting
    try {
      localStorage.setItem(`chat_${activeAgent}`, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  }, [messages, activeAgent]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeAgent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Add user message immediately for instant feedback
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Send the message to the API
      const response = await sendMessage(input, activeAgent);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Show error message if there's an API error
  useEffect(() => {
    if (chatError) {
      const errorMessage: Message = {
        id: 'api-error-' + Date.now(),
        role: 'assistant',
        content: `Error: ${chatError}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [chatError]);

  if (!activeAgent || !agentMetadata) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Agent Selected</h3>
        <p className="text-gray-500 max-w-md">Please select an agent from the sidebar to start chatting.</p>
      </div>
    );
  }

  const { bg: agentBg, text: agentText, border: agentBorder } = AGENT_COLORS[activeAgent];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className={`p-4 border-b ${agentBorder} ${agentBg}`}>
        <h2 className="text-lg font-medium flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full ${agentText.replace('text-', 'bg-')} mr-2`}></span>
          Chat with {agentMetadata.name}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{agentMetadata.description}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Start a conversation with {agentMetadata.name}...</p>
          </div>
        ) : (
          messages.map((message) => (
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
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className={`${agentBg} ${agentText} rounded-lg px-4 py-2 rounded-bl-none`}>
              <div className="flex space-x-2">
                <div className={`w-2 h-2 rounded-full animate-bounce ${agentText.replace('text-', 'bg-').replace('800', '600')}`} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${agentText.replace('text-', 'bg-').replace('800', '600')}`} style={{ animationDelay: '0.2s' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${agentText.replace('text-', 'bg-').replace('800', '600')}`} style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${agentMetadata.name}...`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-70"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className={`p-2 ${agentText.replace('text-', 'bg-').replace('800', '600')} text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${agentText.replace('text-', 'focus:ring-').replace('800', '300')} disabled:opacity-50 transition-opacity`}
            disabled={!input.trim() || isLoading}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

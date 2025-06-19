import { useState, useCallback, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Define the same AgentType as in AgentContext
type AgentType = 'admin' | 'nutrition' | 'fitness' | 'sme';

interface ChatContext {
  agent?: AgentType;
  [key: string]: any;
}

export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { data: session } = useSession();
  
  const sendMessage = useCallback(async (content: string, context: ChatContext = {}) => {
    if (!content.trim()) {
      console.warn('No content provided');
      return;
    }
    
    const userMessage: Message = { 
      id: crypto.randomUUID(), 
      role: 'user', 
      content, 
      timestamp: new Date() 
    };
    
    // Add user message to the UI immediately for better UX
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.accessToken ? { 'Authorization': `Bearer ${session.accessToken}` } : {}),
        },
        body: JSON.stringify({
          message: content,
          context: {
            ...context,
            userId: session?.user?.email,
            name: session?.user?.name,
          },
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }
      
      const data = await response.json();
      
      // The API now returns a properly formatted response with the agent's reply
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response || 'I apologize, but I am unable to respond at the moment.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      return data;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorObj = new Error(errorMessage);
      setError(errorObj);
      
      // Add error message to the chat
      const errorMessageObj: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessageObj]);
      throw errorObj;
      
    } finally {
      setIsLoading(false);
    }
  }, [session]);
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    setMessages,
  };
}

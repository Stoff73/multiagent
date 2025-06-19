import { useState, useCallback, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type MessageRole = 'user' | 'assistant' | 'system';

type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
};

type SessionWithToken = {
  accessToken?: string;
  user?: {
    email?: string | null;
    name?: string | null;
  };
} | null;

export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { data: session } = useSession();
  
  const sessionRef = useRef<SessionWithToken>(session as SessionWithToken);
  
  // Keep session ref in sync with session from useSession
  useEffect(() => {
    sessionRef.current = session as SessionWithToken;
  }, [session]);
  
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !sessionRef.current?.accessToken) {
      console.warn('No content or access token available');
      return;
    }
    
    const userMessage: Message = { 
      id: crypto.randomUUID(), 
      role: 'user', 
      content, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionRef.current.accessToken}`,
        },
        body: JSON.stringify({
          message: content,
          context: {
            userId: sessionRef.current.user?.email,
            name: sessionRef.current.user?.name,
          },
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.response) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorObj = new Error(errorMessage);
      setError(errorObj);
      console.error('Error sending message:', error);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    setMessages,
  };
}

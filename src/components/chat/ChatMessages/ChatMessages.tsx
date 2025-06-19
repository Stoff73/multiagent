'use client';

import { useEffect, useRef } from 'react';
import { ChatMessagesProps } from '../types';
import { MessageBubble } from '../MessageBubble/MessageBubble';

export function ChatMessages({ messages, agentColor }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isUser={message.role === 'user'}
          agentColor={agentColor}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

'use client';

import { MessageBubbleProps } from '../types';

export function MessageBubble({ message, isUser, agentColor }: MessageBubbleProps) {
  const { bg, text } = isUser 
    ? { bg: 'bg-blue-600', text: 'text-white' }
    : { bg: agentColor, text: 'text-inherit' };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3/4 rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : `${bg} ${text} rounded-bl-none`
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p 
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'opacity-60'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
}

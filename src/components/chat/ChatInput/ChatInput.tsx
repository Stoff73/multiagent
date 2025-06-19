'use client';

import { useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ChatInputProps } from '../types';

export function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form 
      onSubmit={onSubmit}
      className="border-t border-gray-200 p-4 bg-white"
    >
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`px-4 py-2 rounded-r-lg ${
            !input.trim() || isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

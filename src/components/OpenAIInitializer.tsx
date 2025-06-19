'use client';

import { useEffect, useState } from 'react';
import { initializeOpenAI } from '@/lib/openai';

export default function OpenAIInitializer() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      const success = initializeOpenAI();
      setIsInitialized(!!success);
      setError(success ? null : 'Failed to initialize OpenAI');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error initializing OpenAI';
      console.error('Failed to initialize OpenAI:', error);
      setError(`OpenAI initialization failed: ${errorMessage}`);
      setIsInitialized(false);
    }
  }, []);

  // Only show error in development or if there's an actual error
  if (process.env.NODE_ENV === 'development' && error) {
    return (
      <div className="fixed bottom-4 right-4 max-w-sm bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg shadow-lg z-50">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">OpenAI Initialization Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-2">
              <a
                href="/api/config"
                className="text-sm font-medium text-red-800 underline hover:text-red-700"
              >
                View configuration details
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

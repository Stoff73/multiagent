import { setDefaultOpenAIKey } from '@openai/agents';

// Initialize OpenAI with the API key from environment variables
export function initializeOpenAI() {
  // Use NEXT_PUBLIC_OPENAI_API_KEY for client-side access
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    if (typeof window !== 'undefined') {
      // Only throw error in browser environment
      throw new Error('OpenAI API key is not configured. Please check your environment variables.');
    }
    return false;
  }
  
  try {
    setDefaultOpenAIKey(apiKey);
    console.log('OpenAI initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize OpenAI:', error);
    return false;
  }
}

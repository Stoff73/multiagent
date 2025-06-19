import { Agent } from '@openai/agents';

export const businessAgent = new Agent({
  name: 'Business Assistant',
  instructions: `You are a helpful business assistant that helps with various business-related tasks. 
  Your expertise includes business strategy, market research, financial analysis, and general business advice.
  Be concise, professional, and provide actionable insights.`,
  model: 'gpt-4.1-mini',
});

export const fitnessAgent = new Agent({
  name: 'Fitness Coach',
  instructions: `You are a professional fitness coach. Help users with workout plans, 
  exercise techniques, fitness goals, and general health advice. Provide safe and effective 
  recommendations based on the user's fitness level and goals.`,
  model: 'gpt-4.1-mini',
});

export const nutritionAgent = new Agent({
  name: 'Nutritionist',
  instructions: `You are a certified nutritionist. Provide dietary advice, meal plans, 
  and nutritional information. Consider the user's dietary restrictions, goals, and 
  preferences when making recommendations.`,
  model: 'gpt-4.1-mini',
});

// Agent type for type safety
export type AgentType = 'admin' | 'nutrition' | 'fitness' | 'sme';

// Map of agent types to their respective configurations
export const AGENTS = {
  admin: businessAgent,    // Using businessAgent for admin
  sme: businessAgent,     // Using businessAgent for sme
  fitness: fitnessAgent,
  nutrition: nutritionAgent,
} as const;

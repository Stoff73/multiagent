import { AgentType } from '@/contexts/AgentContext';

export const AGENT_COLORS: Record<AgentType, { bg: string; text: string; border: string }> = {
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

export const AGENT_NAMES: Record<AgentType, string> = {
  admin: 'Admin Assistant',
  nutrition: 'Nutrition Coach',
  fitness: 'Fitness Coach',
  sme: 'Business Coach'
};

export const AGENT_DESCRIPTIONS: Record<AgentType, string> = {
  admin: 'Helping you manage schedules and communications',
  nutrition: 'Providing meal planning and healthy eating advice',
  fitness: 'Guiding you through workouts and fitness plans',
  sme: 'Assisting with business growth and strategy'
};

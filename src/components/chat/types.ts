import { Message } from '@/hooks/useChat';
import { AgentType } from '@/contexts/AgentContext';

export interface AgentChatPageProps {
  agentType: AgentType;
  greeting?: string;
}

export interface ChatHeaderProps {
  agentType: AgentType;
  agentName: string;
  agentDescription: string;
  agentColor: string;
}

export interface ChatMessagesProps {
  messages: Message[];
  agentColor: string;
}

export interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
  agentColor: string;
}

export interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

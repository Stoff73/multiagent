'use client';

import React, { useEffect, useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  ArrowPathIcon,
  CalendarIcon,
  EnvelopeIcon,
  ChartBarIcon,
  UserGroupIcon,
  BoltIcon,
  CakeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { useAgent } from '@/contexts/AgentContext';

type AgentType = 'admin' | 'nutrition' | 'fitness' | 'sme';

interface ActionEvent {
  id: string;
  type: 'info' | 'success' | 'error' | 'tool' | 'system';
  message: string;
  timestamp: Date;
  toolName?: string;
  icon?: React.ReactNode;
  details?: string;
}

// Agent-specific action generators
const generateAgentActions = (agentType: AgentType): ActionEvent[] => {
  const baseTime = new Date();
  const baseActions: ActionEvent[] = [
    {
      id: '1',
      type: 'system',
      message: 'Session initialized',
      timestamp: new Date(baseTime.getTime() - 60000 * 5), // 5 minutes ago
      icon: <ArrowPathIcon className="h-4 w-4 text-blue-500" />
    }
  ];

  switch (agentType) {
    case 'admin':
      return [
        ...baseActions,
        {
          id: '2',
          type: 'tool',
          message: 'Fetched calendar events',
          toolName: 'get_calendar_events',
          timestamp: new Date(baseTime.getTime() - 300000), // 5 minutes ago
          icon: <CalendarIcon className="h-4 w-4 text-blue-500" />,
          details: 'Found 3 upcoming events'
        },
        {
          id: '3',
          type: 'tool',
          message: 'Processed emails',
          toolName: 'process_emails',
          timestamp: new Date(baseTime.getTime() - 120000), // 2 minutes ago
          icon: <EnvelopeIcon className="h-4 w-4 text-green-500" />,
          details: '5 new emails, 2 require attention'
        }
      ];
    case 'nutrition':
      return [
        ...baseActions,
        {
          id: '2',
          type: 'tool',
          message: 'Updated meal plan',
          toolName: 'update_meal_plan',
          timestamp: new Date(baseTime.getTime() - 3600000), // 1 hour ago
          icon: <CakeIcon className="h-4 w-4 text-green-500" />,
          details: 'Adjusted macros based on your activity'
        },
        {
          id: '3',
          type: 'info',
          message: 'Meal logged',
          timestamp: new Date(baseTime.getTime() - 1800000), // 30 minutes ago
          icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
          details: 'Lunch: Grilled chicken salad (450 cal)'
        }
      ];
    case 'fitness':
      return [
        ...baseActions,
        {
          id: '2',
          type: 'tool',
          message: 'Workout completed',
          toolName: 'log_workout',
          timestamp: new Date(baseTime.getTime() - 7200000), // 2 hours ago
          icon: <BoltIcon className="h-4 w-4 text-blue-500" />,
          details: 'Morning run: 5km in 25 minutes'
        },
        {
          id: '3',
          type: 'info',
          message: 'Activity synced',
          timestamp: new Date(baseTime.getTime() - 5400000), // 1.5 hours ago
          icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
          details: 'Steps: 8,742 | Active minutes: 68'
        }
      ];
    case 'sme':
      return [
        ...baseActions,
        {
          id: '2',
          type: 'tool',
          message: 'Market analysis complete',
          toolName: 'analyze_market',
          timestamp: new Date(baseTime.getTime() - 86400000), // 1 day ago
          icon: <ChartBarIcon className="h-4 w-4 text-purple-500" />,
          details: 'Competitor analysis updated for Q2'
        },
        {
          id: '3',
          type: 'info',
          message: 'Team update',
          timestamp: new Date(baseTime.getTime() - 43200000), // 12 hours ago
          icon: <UserGroupIcon className="h-4 w-4 text-blue-500" />,
          details: 'Team meeting scheduled for tomorrow at 10 AM'
        }
      ];
    default:
      return baseActions;
  }
};

export default function ActionsFeed() {
  const { activeAgent } = useAgent();
  const [actions, setActions] = useState<ActionEvent[]>([]);

  // Generate agent-specific actions when activeAgent changes
  useEffect(() => {
    if (activeAgent) {
      setActions(generateAgentActions(activeAgent));
    } else {
      setActions([]);
    }
  }, [activeAgent]);

  const getTypeIcon = (type: ActionEvent['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="h-4 w-4 text-red-500" />;
      case 'tool':
        return <ArrowPathIcon className="h-4 w-4 text-blue-500" />;
      case 'system':
        return <ArrowPathIcon className="h-4 w-4 text-gray-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Activity Feed</h2>
          <button 
            onClick={() => activeAgent && setActions(generateAgentActions(activeAgent))}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            aria-label="Refresh"
            disabled={!activeAgent}
          >
            <ArrowPathIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {actions.length > 0 ? (
            actions.map((action) => (
              <li key={action.id} className="p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {action.icon || getTypeIcon(action.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {action.message}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(action.timestamp)}
                      </span>
                    </div>
                    {action.toolName && (
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-gray-100 text-gray-800">
                          {action.toolName}
                        </span>
                      </div>
                    )}
                    {action.details && (
                      <p className="mt-1 text-xs text-gray-500">
                        {action.details}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">No recent activity</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

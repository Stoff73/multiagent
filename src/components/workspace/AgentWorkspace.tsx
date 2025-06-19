'use client';

import React, { useEffect } from 'react';
import { UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import ChatPanel from './ChatPanel';
import ActionsFeed from './ActionsFeed';
import WidgetZone from './WidgetZone';
import { useAgent } from '@/contexts/AgentContext';

export default function AgentWorkspace() {
  const { activeAgent, agentMetadata } = useAgent();
  
  // If no agent is selected, show a loading state
  if (!activeAgent || !agentMetadata) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading agent workspace...</p>
        </div>
      </div>
    );
  }
  
  const { name: agentName, description: agentDescription = 'Ready to assist' } = agentMetadata;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{agentName}</h1>
                <p className="text-sm text-gray-500">{agentDescription}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chat */}
            <div className="lg:col-span-2 h-[calc(100vh-12rem)]">
              <ChatPanel />
            </div>

            {/* Right Column - Widgets and Actions */}
            <div className="space-y-6">
              <div className="h-[calc(50vh-6rem)]">
                <WidgetZone />
              </div>
              <div className="h-[calc(50vh-6rem)]">
                <ActionsFeed />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import React from 'react';
import { useAgent } from '@/contexts/AgentContext';

import { AgentType } from '@/contexts/AgentContext';

// Import widgets
import FreeSlotPicker from '../widgets/FreeSlotPicker';

// Import placeholder widgets
import {
  EmailTriagePlaceholder,
  MealPlanPlaceholder,
  MacroGaugePlaceholder,
  WorkoutPlaceholder,
  TaskKanbanPlaceholder,
  DocHighlightsPlaceholder
} from '../widgets/PlaceholderWidget';

// Define widget component type
type WidgetComponent = React.ComponentType<{ className?: string }>;

// Define widget map type
type WidgetMap = {
  [key in AgentType]: WidgetComponent[];
};

const WIDGET_MAP: WidgetMap = {
  admin: [FreeSlotPicker, EmailTriagePlaceholder],
  nutrition: [MealPlanPlaceholder, MacroGaugePlaceholder],
  fitness: [WorkoutPlaceholder],
  sme: [TaskKanbanPlaceholder, DocHighlightsPlaceholder],
} as const;

// Default widget to show when no agent is selected
const DefaultWidget = () => (
  <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
    <div className="bg-blue-100 p-4 rounded-full mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-1">Select an Agent</h3>
    <p className="text-gray-500 max-w-md">Choose an agent from the sidebar to see relevant widgets and information.</p>
  </div>
);

export default function WidgetZone() {
  const { activeAgent, agentMetadata } = useAgent();
  
  // If no agent is selected, show the default widget
  if (!activeAgent || !agentMetadata) {
    return <DefaultWidget />;
  }
  
  const widgets = WIDGET_MAP[activeAgent] || [];
  
  if (widgets.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <div className="bg-yellow-100 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No Widgets Available</h3>
        <p className="text-gray-500 max-w-md">There are no widgets configured for the {agentMetadata.name} agent yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full">
      {widgets.map((Widget, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          <Widget />
        </div>
      ))}
    </div>
  );
}

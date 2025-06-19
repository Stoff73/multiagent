'use client';

import React from 'react';
import { 
  BeakerIcon, 
  LightBulbIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

interface PlaceholderWidgetProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

export const PlaceholderWidget: React.FC<PlaceholderWidgetProps> = ({
  title,
  description,
  icon: Icon,
  color = 'blue'
}) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  const colorClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className={`${colorClass} p-3 rounded-full mb-4`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs">{description}</p>
    </div>
  );
};

// Specific widget placeholders
export const EmailTriagePlaceholder = () => (
  <PlaceholderWidget
    title="Email Triage"
    description="View and manage your emails in one place"
    icon={EnvelopeIcon}
    color="blue"
  />
);

export const MealPlanPlaceholder = () => (
  <PlaceholderWidget
    title="Meal Plan"
    description="Your personalized meal plans will appear here"
    icon={BeakerIcon}
    color="green"
  />
);

export const WorkoutPlaceholder = () => (
  <PlaceholderWidget
    title="Workout Plan"
    description="Your workout routines will be displayed here"
    icon={LightBulbIcon}
    color="purple"
  />
);

export const TaskKanbanPlaceholder = () => (
  <PlaceholderWidget
    title="Task Manager"
    description="Organize and track your tasks"
    icon={DocumentTextIcon}
    color="yellow"
  />
);

export const DocHighlightsPlaceholder = () => (
  <PlaceholderWidget
    title="Document Highlights"
    description="Important documents and notes will appear here"
    icon={DocumentTextIcon}
    color="blue"
  />
);

export const MacroGaugePlaceholder = () => (
  <PlaceholderWidget
    title="Nutrition Overview"
    description="Track your macronutrients and calories"
    icon={ChartBarIcon}
    color="green"
  />
);

export default PlaceholderWidget;

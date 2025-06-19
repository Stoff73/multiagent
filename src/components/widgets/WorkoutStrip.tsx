'use client';

import React from 'react';
import { BoltIcon, FireIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const workouts = [
  {
    id: 1,
    name: 'Morning Run',
    type: 'cardio',
    duration: 45,
    calories: 320,
    completed: true,
    icon: <BoltIcon className="h-5 w-5 text-blue-500" />
  },
  {
    id: 2,
    name: 'Upper Body',
    type: 'strength',
    duration: 60,
    calories: 280,
    completed: false,
    icon: <FireIcon className="h-5 w-5 text-orange-500" />
  },
  {
    id: 3,
    name: 'Yoga',
    type: 'flexibility',
    duration: 30,
    calories: 150,
    completed: false,
    icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />
  },
];

const stats = [
  { name: 'Today', value: '45 min', change: '+12%', changeType: 'positive' },
  { name: 'This Week', value: '3h 15m', change: '+5%', changeType: 'positive' },
  { name: 'Calories', value: '1,240', change: '+8%', changeType: 'positive' },
];

export default function WorkoutStrip() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Today's Workout</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {workouts.filter(w => w.completed).length} of {workouts.length} completed
          </span>
          <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(workouts.filter(w => w.completed).length / workouts.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {workouts.map((workout) => (
          <div 
            key={workout.id}
            className={`p-4 rounded-lg border ${
              workout.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {workout.icon}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{workout.name}</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {workout.type}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span>{workout.duration} min • {workout.calories} cal</span>
                </div>
              </div>
            </div>
            {!workout.completed && (
              <div className="mt-3 flex">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start Workout
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-3 rounded-lg border border-gray-200">
            <dt className="text-xs font-medium text-gray-500 truncate">{stat.name}</dt>
            <dd className="mt-1 flex items-baseline">
              <span className="text-lg font-semibold text-gray-900">{stat.value}</span>
              <span className={`ml-2 text-xs font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}

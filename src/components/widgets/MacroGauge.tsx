'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FireIcon, ScaleIcon, BoltIcon } from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

type MacroType = 'protein' | 'carbs' | 'fat';

interface MacroGoal {
  current: number;
  target: number;
  color: string;
  icon: React.ReactNode;
}

export default function MacroGauge() {
  const macros: Record<MacroType, MacroGoal> = {
    protein: {
      current: 120,
      target: 160,
      color: 'rgba(59, 130, 246, 0.8)',
      icon: <ScaleIcon className="h-5 w-5 text-blue-500" />
    },
    carbs: {
      current: 180,
      target: 200,
      color: 'rgba(16, 185, 129, 0.8)',
      icon: <BoltIcon className="h-5 w-5 text-green-500" />
    },
    fat: {
      current: 45,
      target: 60,
      color: 'rgba(245, 158, 11, 0.8)',
      icon: <FireIcon className="h-5 w-5 text-yellow-500" />
    }
  };

  const data = {
    labels: Object.keys(macros),
    datasets: [
      {
        data: Object.values(macros).map(m => m.current),
        backgroundColor: Object.values(macros).map(m => m.color),
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const target = macros[label as MacroType]?.target || 0;
            return `${label}: ${value}g of ${target}g`;
          }
        }
      }
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Macro Tracker</h3>
        <div className="text-sm text-gray-500">Daily Goals</div>
      </div>
      
      <div className="relative h-48 mb-6">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Object.values(macros).reduce((sum, m) => sum + m.current, 0)}g
            </div>
            <div className="text-sm text-gray-500">Total Macros</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {Object.entries(macros).map(([key, macro]) => {
          const percentage = Math.min(Math.round((macro.current / macro.target) * 100), 100);
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="flex-shrink-0">{macro.icon}</span>
                  <span className="text-sm font-medium capitalize">{key}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {macro.current}g <span className="text-gray-400">/ {macro.target}g</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: macro.color.replace('0.8', '1')
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

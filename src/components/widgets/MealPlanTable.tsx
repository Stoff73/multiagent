'use client';

import React from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const meals = [
  { 
    id: 1, 
    meal: 'Breakfast', 
    name: 'Avocado Toast', 
    calories: 320,
    protein: 8,
    carbs: 30,
    fat: 20,
    completed: true
  },
  { 
    id: 2, 
    meal: 'Lunch', 
    name: 'Grilled Chicken Salad', 
    calories: 450,
    protein: 35,
    carbs: 20,
    fat: 25,
    completed: false
  },
  { 
    id: 3, 
    meal: 'Dinner', 
    name: 'Salmon with Quinoa', 
    calories: 520,
    protein: 40,
    carbs: 45,
    fat: 22,
    completed: false
  },
  { 
    id: 4, 
    meal: 'Snack', 
    name: 'Greek Yogurt with Berries', 
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 5,
    completed: false
  },
];

export default function MealPlanTable() {
  const total = {
    calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
    protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
    carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
    fat: meals.reduce((sum, meal) => sum + meal.fat, 0),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Today's Meal Plan</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {meals.filter(m => m.completed).length} of {meals.length} completed
          </span>
          <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(meals.filter(m => m.completed).length / meals.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {meals.map((meal) => (
          <div 
            key={meal.id} 
            className={`p-3 rounded-lg border ${meal.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{meal.meal}</h4>
                  {meal.completed ? (
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ClockIcon className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{meal.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{meal.calories} cal</p>
                <p className="text-xs text-gray-500">
                  P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-medium">{total.calories} cal</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Protein</p>
            <p className="font-medium">{total.protein}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Carbs</p>
            <p className="font-medium">{total.carbs}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fat</p>
            <p className="font-medium">{total.fat}g</p>
          </div>
        </div>
      </div>
    </div>
  );
}

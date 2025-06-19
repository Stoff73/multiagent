'use client';

import React, { useState } from 'react';
import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

type TaskStatus = 'todo' | 'inProgress' | 'done';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-gray-200 text-gray-800' },
  inProgress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  done: { label: 'Done', color: 'bg-green-100 text-green-800' },
};

const priorityConfig = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', color: 'bg-red-100 text-red-800' },
};

export default function TaskKanban() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Q2 financial report',
      description: 'Check numbers and prepare summary',
      status: 'todo',
      priority: 'high',
      dueDate: '2025-06-20',
    },
    {
      id: '2',
      title: 'Team sync meeting',
      description: 'Weekly team sync at 2 PM',
      status: 'inProgress',
      priority: 'medium',
      dueDate: '2025-06-18',
    },
    {
      id: '3',
      title: 'Update product roadmap',
      description: 'Incorporate feedback from stakeholders',
      status: 'inProgress',
      priority: 'high',
      dueDate: '2025-06-19',
    },
    {
      id: '4',
      title: 'Send newsletter',
      description: 'Monthly newsletter to subscribers',
      status: 'done',
      priority: 'low',
      dueDate: '2025-06-15',
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
      priority: 'medium',
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Tasks</h3>
        <button
          onClick={() => setIsAddingTask(true)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
          Add Task
        </button>
      </div>

      {isAddingTask && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && addNewTask()}
            autoFocus
          />
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingTask(false)}
              className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={addNewTask}
              className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              disabled={!newTaskTitle.trim()}
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(statusConfig).map(([status, { label, color }]) => (
          <div 
            key={status}
            className="bg-gray-50 rounded-lg p-3"
            onDrop={(e) => handleDrop(e, status as TaskStatus)}
            onDragOver={handleDragOver}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{label}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
                {getTasksByStatus(status as TaskStatus).length}
              </span>
            </div>
            <div className="space-y-3">
              {getTasksByStatus(status as TaskStatus).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-gray-900">{task.title}</h5>
                    <button className="text-gray-400 hover:text-gray-600">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  </div>
                  {task.description && (
                    <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    {task.dueDate && (
                      <span className="text-xs text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      priorityConfig[task.priority].color
                    }`}>
                      {priorityConfig[task.priority].label}
                    </span>
                  </div>
                </div>
              ))}
              {getTasksByStatus(status as TaskStatus).length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  No tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

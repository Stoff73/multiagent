'use client';

import React from 'react';
import { EnvelopeIcon, CheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const emails = [
  {
    id: 1,
    from: 'team@company.com',
    subject: 'Weekly Team Update',
    preview: 'Here are the updates from last week...',
    read: false,
    priority: 'high',
  },
  {
    id: 2,
    from: 'notifications@github.com',
    subject: 'Pull Request: Update README',
    preview: 'A new pull request has been opened...',
    read: true,
    priority: 'medium',
  },
  {
    id: 3,
    from: 'news@medium.com',
    subject: 'Top stories for you',
    preview: 'Check out these trending articles...',
    read: true,
    priority: 'low',
  },
];

export default function EmailTriage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Email Triage</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>
      
      <div className="space-y-3">
        {emails.map((email) => (
          <div
            key={email.id}
            className={`p-3 rounded-lg border ${
              email.priority === 'high' ? 'border-red-200 bg-red-50' : 
              email.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' : 
              'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 pt-1">
                <EnvelopeIcon className={`h-5 w-5 ${
                  email.priority === 'high' ? 'text-red-500' : 
                  email.priority === 'medium' ? 'text-yellow-500' : 'text-gray-400'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{email.subject}</p>
                <p className="text-xs text-gray-500 truncate">{email.from}</p>
                <p className="text-sm text-gray-700 mt-1 line-clamp-2">{email.preview}</p>
              </div>
              {!email.read && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  New
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button className="w-full py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Compose New Email
        </button>
      </div>
    </div>
  );
}

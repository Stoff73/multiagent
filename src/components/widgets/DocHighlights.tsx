'use client';

import React from 'react';
import { DocumentTextIcon, ArrowUpRightIcon, StarIcon, ClockIcon, UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';

const documents = [
  {
    id: 1,
    title: 'Q2 Financial Report',
    type: 'report',
    lastModified: '2025-06-15',
    modifiedBy: 'Alex Johnson',
    priority: 'high',
    excerpt: 'Revenue increased by 12% compared to last quarter, with significant growth in our subscription segment...',
    tags: ['finance', 'quarterly'],
  },
  {
    id: 2,
    title: 'Product Roadmap 2025',
    type: 'presentation',
    lastModified: '2025-06-10',
    modifiedBy: 'Jamie Smith',
    priority: 'high',
    excerpt: 'Outlining the key milestones and features planned for the next two quarters, including the new analytics dashboard...',
    tags: ['product', 'planning'],
  },
  {
    id: 3,
    title: 'Team Offsite Agenda',
    type: 'document',
    lastModified: '2025-06-05',
    modifiedBy: 'Taylor Wilson',
    priority: 'medium',
    excerpt: 'Schedule and activities for the upcoming team offsite in July. Includes team building exercises and strategy sessions...',
    tags: ['events', 'team'],
  },
];

const docTypeIcons = {
  report: <DocumentTextIcon className="h-5 w-5 text-blue-500" />,
  presentation: <DocumentTextIcon className="h-5 w-5 text-purple-500" />,
  document: <DocumentTextIcon className="h-5 w-5 text-gray-500" />,
};

export default function DocHighlights() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Document Highlights</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          View All <ArrowUpRightIcon className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {docTypeIcons[doc.type as keyof typeof docTypeIcons] || docTypeIcons.document}
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {doc.title}
                    </h4>
                    {doc.priority === 'high' && (
                      <StarIcon className="ml-2 h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {doc.excerpt}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {doc.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <ArrowUpRightIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <div className="flex items-center mr-4">
                <ClockIcon className="mr-1 h-3.5 w-3.5" />
                <span>{new Date(doc.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="mr-1 h-3.5 w-3.5" />
                <span>{doc.modifiedBy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <button className="w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
          <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
          Add New Document
        </button>
      </div>
    </div>
  );
}

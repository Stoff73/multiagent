'use client';

import { useEffect } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import dynamic from 'next/dynamic';

const AdminWorkspace = dynamic(() => import('./AdminWorkspace'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function AdminPage() {
  const { setActiveAgent } = useAgent();

  useEffect(() => {
    setActiveAgent('admin');
  }, [setActiveAgent]);

  return <AdminWorkspace />;
}

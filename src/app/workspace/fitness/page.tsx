'use client';

import { useEffect } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import dynamic from 'next/dynamic';

const FitnessWorkspace = dynamic(() => import('./FitnessWorkspace'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function FitnessPage() {
  const { setActiveAgent } = useAgent();

  useEffect(() => {
    setActiveAgent('fitness');
  }, [setActiveAgent]);

  return <FitnessWorkspace />;
}

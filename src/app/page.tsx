'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If we're still loading the session, do nothing
    if (status === 'loading') return;

    // If user is not authenticated, redirect to sign-in
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // If user is authenticated, redirect to SME workspace
    router.push('/workspace/sme');
  }, [session, status, router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your workspace...</p>
      </div>
    </div>
  );
}

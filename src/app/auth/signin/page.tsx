'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const { status } = useSession();
  
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await signIn('google', { 
        callbackUrl,
        redirect: false 
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      // If we get here, sign in was successful
      router.push(callbackUrl);
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTestSignIn = async (email = 'test@example.com') => {
    try {
      setIsLoading(true);
      setError('');
      const result = await signIn('credentials', {
        email,
        redirect: false,
        callbackUrl
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      router.push(callbackUrl);
    } catch (err) {
      console.error('Test sign in error:', err);
      setError('Failed to sign in with test account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link 
              href="/" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              return to the homepage
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {isDevelopment && (
            <>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Development Mode: Use test credentials
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleTestSignIn('test@example.com')}
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in as Test User'}
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.88-1.757-4.399-2.744-6.735-2.744-5.522 0-10 4.479-10 10s4.478 10 10 10c8.396 0 10-7.48 10-10 0-0.67-0.069-1.325-0.143-1.961h-9.86z" />
              </svg>
            </span>
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

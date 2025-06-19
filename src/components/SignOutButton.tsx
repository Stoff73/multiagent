'use client';

import React, { useState } from 'react';

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Sign-out failed');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Unknown error during sign-out');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleSignOut} disabled={loading}>
        {loading ? 'Signing out...' : 'Sign Out'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Signed out successfully.</p>}
    </div>
  );
}
import type { NextApiRequest, NextApiResponse } from 'next';
import { federatedSignOut } from '../../../lib/oauth/signOut';
import { sessionCleanupMiddleware } from '../../../lib/middleware/sessionCleanupMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Extract tokens from cookies or session (example)
    const googleToken = req.cookies['googleToken'] ?? undefined;
    const microsoftToken = req.cookies['microsoftToken'] ?? undefined;

    // Call federated sign-out logic
    const results = await federatedSignOut({ googleToken, microsoftToken });

    // Clear cookies (example)
    res.setHeader('Set-Cookie', [
      'googleToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax',
      'microsoftToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax',
      'sessionId=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax',
    ]);

    // Call session cleanup middleware logic (simulate)
    await new Promise<void>((resolve) => {
      sessionCleanupMiddleware(req, res, () => resolve());
    });

    // Check for any errors in federated sign-out results
    const errors = results.filter((r: { success: boolean }) => !r.success);
    if (errors.length > 0) {
      return res.status(500).json({ message: 'Error during federated sign-out', details: errors });
    }

    return res.status(200).json({ message: 'Signed out successfully' });
  } catch (error: any) {
    console.error('Sign-out API error:', error);
    return res.status(500).json({ message: 'Internal server error during sign-out' });
  }
}
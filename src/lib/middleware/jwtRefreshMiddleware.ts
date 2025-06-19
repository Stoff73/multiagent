/**
 * Note: Ensure 'jsonwebtoken' package is installed: npm install jsonwebtoken
 */

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Remove default values - these should always be set via environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Add validation
if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('JWT_SECRET and REFRESH_TOKEN_SECRET must be set in environment variables');
}

// Simulated token store for refresh tokens (in production use DB or Redis)
const refreshTokenStore = new Map<string, string>();

// Middleware to handle JWT refresh
export async function jwtRefreshMiddleware(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.next();
    }

    try {
      // Verify JWT token
      jwt.verify(token, JWT_SECRET);
      // Token valid, proceed
      return NextResponse.next();
    } catch (err: any) {
      if (err.name !== 'TokenExpiredError') {
        // Invalid token, proceed without refresh
        return NextResponse.next();
      }
      // Token expired, try refresh
      const refreshToken = req.cookies.get('refreshToken');
      if (!refreshToken) {
        // No refresh token, logout user
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Verify refresh token
      let payload;
      try {
        payload = jwt.verify(refreshToken.value, REFRESH_TOKEN_SECRET) as { userId: string };
      } catch {
        // Invalid refresh token, logout user
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Check refresh token in store
      const storedToken = refreshTokenStore.get(payload.userId);
      if (storedToken !== refreshToken.value) {
        // Token mismatch, logout user
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Issue new JWT
      const newToken = jwt.sign({ userId: payload.userId }, JWT_SECRET, { expiresIn: '15m' });

      // Set new JWT in response header for client to update
      const response = NextResponse.next();
      response.headers.set('Authorization', `Bearer ${newToken}`);

      // Proceed with request
      return response;
    }
  } catch (error) {
    // Log error and proceed without refresh
    console.error('JWT Refresh Middleware error:', error);
    return NextResponse.next();
  }
}
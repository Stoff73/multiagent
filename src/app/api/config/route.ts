import { NextResponse } from 'next/server';

export async function GET() {
  // Only expose non-sensitive configuration in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    openAiKeyConfigured: !!process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    googleClientId: !!process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  });
}

import type { NextConfig } from 'next';

// For local development
const isLocal = process.env.NODE_ENV !== 'production';
const protocol = isLocal ? 'http' : 'https';
const host = process.env.NEXTAUTH_URL ? 
  new URL(process.env.NEXTAUTH_URL).host : 'localhost:3000';
const NEXTAUTH_URL = `${protocol}://${host}`;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

// Validate required environment variables
const requiredEnvVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

console.log('NEXTAUTH_URL:', NEXTAUTH_URL);
console.log('Environment:', process.env.NODE_ENV);

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/workspace/business',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    NEXTAUTH_URL,
    NEXTAUTH_SECRET,
  },
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
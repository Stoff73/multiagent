import NextAuth, { type NextAuthOptions, type DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Debug logs
const isLocal = process.env.NODE_ENV !== 'production';
const protocol = isLocal ? 'http' : 'https';
const host = process.env.NEXTAUTH_URL ? 
  new URL(process.env.NEXTAUTH_URL).host : 'localhost:3000';
const siteUrl = `${protocol}://${host}`;

console.log('Environment Variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- NEXTAUTH_URL:', siteUrl);
console.log('- NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set');
console.log('- GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set');
console.log('- GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set');

// Extend the built-in session types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      accessToken?: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  // Enable debug messages in the console
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-for-testing-only',
  
  // Configure authentication providers
  providers: [
    // Google OAuth Provider (disabled in development if no credentials)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ] : []),
    
    // Test credentials provider (only in development)
    ...(process.env.NODE_ENV === 'development' ? [
      CredentialsProvider({
        name: 'Test Account',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@example.com" },
        },
        async authorize(credentials) {
          // This is a test user for development only
          const testUser = {
            id: 'test-user-123',
            name: 'Test User',
            email: credentials?.email || 'test@example.com',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test',
          };
          return testUser;
        },
      }),
    ] : []),
  ],
  
  // Use JWT strategy for sessions
  session: {
    strategy: 'jwt',
  },
  
  // Custom pages for sign in/out/error
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  
  // Configure cookies with secure settings
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // For local development, allow cross-site cookies
        ...(process.env.NODE_ENV === 'development' && {
          domain: 'localhost',
          sameSite: 'lax',
        }),
      },
    },
  },
  
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Allow all users in development
      if (process.env.NODE_ENV === 'development') return true;
      
      // In production, only allow users with verified emails
      if (user.email) {
        return true;
      }
      return false;
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add custom session properties
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function getServerSession() {
  return await import('next-auth/next').then((mod) =>
    mod.getServerSession(authOptions)
  );
}

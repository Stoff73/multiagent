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

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

// For development, we need to trust the localhost
const useSecureCookies = siteUrl.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

console.log('Using secure cookies:', useSecureCookies);

export const authOptions: NextAuthOptions = {
  // Enable debug messages in the console
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  
  // Configure cookies with secure settings
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        // For local development, allow cross-site cookies
        ...(process.env.NODE_ENV === 'development' && {
          domain: 'localhost',
          sameSite: 'lax',
        }),
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        // For local development, allow cross-site cookies
        ...(process.env.NODE_ENV === 'development' && {
          domain: 'localhost',
          sameSite: 'lax',
        }),
      },
    },
    csrfToken: {
      name: `${cookiePrefix}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
  },
  
  // Configure pages
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  // Configure providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Use minimal configuration
      authorization: {
        params: {
          // Minimal required scopes
          scope: 'openid email profile',
          // Standard OAuth2 parameters
          prompt: 'select_account',
          access_type: 'offline',
          // Enable granular permissions
          include_granted_scopes: true,
          // Enable granular consent UI
          enable_granular_consent: true
        },
      },
      // Add token endpoint configuration
      token: {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
        },
      },
      // HTTP options
      httpOptions: {
        timeout: 10000,
      },
      // Allow account linking
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  
  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Callbacks
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
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

export const getServerSession = async () => {
  const session = await NextAuth(authOptions).auth();
  return session;
};

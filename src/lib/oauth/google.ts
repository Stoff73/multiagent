/**
 * Google OAuth integration module
 * Uses Google Identity Services for OAuth 2.0 sign-in
 */

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleUser {
  token: string;
  profile: {
    email: string;
    name: string;
    picture: string;
  };
}

export function loadGoogleScript(clientId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('google-oauth')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'google-oauth';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google OAuth script'));
    document.head.appendChild(script);
  });
}

export function initializeGoogleSignIn(clientId: string, callback: (user: GoogleUser | null, error?: Error) => void): void {
  if (!window.google) {
    callback(null, new Error('Google API not loaded'));
    return;
  }
  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: (response: any) => {
      if (response.credential) {
        // Decode JWT token to extract user info
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        const profile = JSON.parse(jsonPayload);
        const user: GoogleUser = {
          token: response.credential,
          profile: {
            email: profile.email,
            name: profile.name,
            picture: profile.picture,
          },
        };
        callback(user);
      } else {
        callback(null, new Error('No credential received'));
      }
    },
  });
}

export function promptGoogleSignIn(): void {
  if (!window.google) {
    throw new Error('Google API not loaded');
  }
  window.google.accounts.id.prompt();
}
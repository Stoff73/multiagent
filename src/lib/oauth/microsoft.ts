/**
 * Microsoft OAuth integration module
 * Uses MSAL.js for OAuth 2.0 sign-in
 */

import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '', // TODO: Insert your Microsoft app client ID here
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export async function signInMicrosoft(): Promise<string> {
  const loginRequest = {
    scopes: ['user.read'],
  };

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    if (loginResponse && loginResponse.accessToken) {
      return loginResponse.accessToken;
    } else {
      throw new Error('No access token received');
    }
  } catch (error) {
    throw error;
  }
}
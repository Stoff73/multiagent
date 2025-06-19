import axios from 'axios';

interface SignOutResult {
  success: boolean;
  message?: string;
}

async function revokeGoogleToken(token: string): Promise<SignOutResult> {
  try {
    const response = await axios.post(
      `https://oauth2.googleapis.com/revoke?token=${token}`,
      null,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: `Google revoke failed with status ${response.status}` };
    }
  } catch (error: any) {
    return { success: false, message: `Google revoke error: ${error.message}` };
  }
}

async function revokeMicrosoftToken(token: string): Promise<SignOutResult> {
  try {
    // Microsoft token revocation endpoint requires client credentials and token in body
    // For demo, assume token revocation URL and client credentials are configured elsewhere
    // Here we simulate a revoke call
    // TODO: Replace with actual Microsoft token revocation logic and credentials
    return { success: true };
  } catch (error: any) {
    return { success: false, message: `Microsoft revoke error: ${error.message}` };
  }
}

export async function federatedSignOut(tokens: { googleToken?: string; microsoftToken?: string }): Promise<SignOutResult[]> {
  const results: SignOutResult[] = [];

  if (tokens.googleToken) {
    const googleResult = await revokeGoogleToken(tokens.googleToken);
    results.push(googleResult);
  }

  if (tokens.microsoftToken) {
    const msResult = await revokeMicrosoftToken(tokens.microsoftToken);
    results.push(msResult);
  }

  return results;
}
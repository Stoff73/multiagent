import { federatedSignOut } from './signOut';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('federatedSignOut', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should revoke Google token successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    const results = await federatedSignOut({ googleToken: 'valid-google-token' });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://oauth2.googleapis.com/revoke?token=valid-google-token',
      null,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    expect(results).toEqual([{ success: true }]);
  });

  it('should handle Google token revocation failure', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 400 });

    const results = await federatedSignOut({ googleToken: 'invalid-google-token' });

    expect(results[0].success).toBe(false);
    expect(results[0].message).toMatch(/Google revoke failed/);
  });

  it('should handle Google token revocation error', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

    const results = await federatedSignOut({ googleToken: 'error-token' });

    expect(results[0].success).toBe(false);
    expect(results[0].message).toMatch(/Google revoke error/);
  });

  it('should revoke Microsoft token successfully', async () => {
    // Microsoft revoke is stubbed to always succeed
    const results = await federatedSignOut({ microsoftToken: 'valid-ms-token' });

    expect(results).toEqual([{ success: true }]);
  });

  it('should revoke both tokens', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    const results = await federatedSignOut({ googleToken: 'google-token', microsoftToken: 'ms-token' });

    expect(results.length).toBe(2);
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(true);
  });

  it('should return empty array if no tokens provided', async () => {
    const results = await federatedSignOut({});

    expect(results).toEqual([]);
  });
});
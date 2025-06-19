import handler from './signout';
import httpMocks from 'node-mocks-http';
import { federatedSignOut } from '../../../lib/oauth/signOut';

jest.mock('../../../lib/oauth/signOut');

describe('POST /api/auth/signout', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    const req = httpMocks.createRequest({ method: 'GET' });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' });
  });

  it('signs out successfully with valid tokens', async () => {
    (federatedSignOut as jest.Mock).mockResolvedValue([{ success: true }, { success: true }]);

    const req = httpMocks.createRequest({
      method: 'POST',
      cookies: { googleToken: 'token1', microsoftToken: 'token2' },
    });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(federatedSignOut).toHaveBeenCalledWith({ googleToken: 'token1', microsoftToken: 'token2' });
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Signed out successfully' });
  });

  it('handles federated sign-out errors', async () => {
    (federatedSignOut as jest.Mock).mockResolvedValue([{ success: false, message: 'Error' }]);

    const req = httpMocks.createRequest({
      method: 'POST',
      cookies: { googleToken: 'token1' },
    });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toHaveProperty('message', 'Error during federated sign-out');
  });

  it('handles internal server errors', async () => {
    (federatedSignOut as jest.Mock).mockRejectedValue(new Error('Internal error'));

    const req = httpMocks.createRequest({
      method: 'POST',
      cookies: { googleToken: 'token1' },
    });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toHaveProperty('message', 'Internal server error during sign-out');
  });
});
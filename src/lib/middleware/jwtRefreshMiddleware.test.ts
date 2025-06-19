import { jwtRefreshMiddleware } from './jwtRefreshMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

const mockVerify = jwt.verify as jest.Mock;
const mockSign = jwt.sign as jest.Mock;

describe('jwtRefreshMiddleware', () => {
  const userId = 'user123';
  const validToken = 'valid.jwt.token';
  const expiredToken = 'expired.jwt.token';
  const validRefreshToken = 'valid.refresh.token';
  const invalidRefreshToken = 'invalid.refresh.token';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  function createRequest(authToken?: string, refreshToken?: string) {
    const headers = new Map<string, string>();
    if (authToken) {
      headers.set('authorization', `Bearer ${authToken}`);
    }
    const cookies = new Map<string, { value: string }>();
    if (refreshToken) {
      cookies.set('refreshToken', { value: refreshToken });
    }
    return {
      headers: {
        get: (key: string) => headers.get(key),
      },
      cookies: {
        get: (key: string) => cookies.get(key),
      },
      url: 'http://localhost',
    } as unknown as NextRequest;
  }

  it('should proceed if no authorization header', async () => {
    const req = createRequest();
    const res = await jwtRefreshMiddleware(req);
    expect(res).toBeInstanceOf(NextResponse);
  });

  it('should proceed if token is valid', async () => {
    mockVerify.mockImplementation(() => ({}));
    const req = createRequest(validToken);
    const res = await jwtRefreshMiddleware(req);
    expect(mockVerify).toHaveBeenCalledWith(validToken, expect.any(String));
    expect(res).toBeInstanceOf(NextResponse);
  });

  it('should refresh token if expired and refresh token valid', async () => {
    mockVerify.mockImplementation((token: string) => {
      if (token === expiredToken) {
        const error: any = new Error('Token expired');
        error.name = 'TokenExpiredError';
        throw error;
      }
      if (token === validRefreshToken) {
        return { userId };
      }
      return {};
    });
    mockSign.mockReturnValue('new.jwt.token');

    const req = createRequest(expiredToken, validRefreshToken);
    const res = await jwtRefreshMiddleware(req);

    expect(mockVerify).toHaveBeenCalledWith(expiredToken, expect.any(String));
    expect(mockVerify).toHaveBeenCalledWith(validRefreshToken, expect.any(String));
    expect(mockSign).toHaveBeenCalledWith({ userId }, expect.any(String), { expiresIn: '15m' });
    expect(res.headers.get('Authorization')).toBe('Bearer new.jwt.token');
  });

  it('should redirect to login if refresh token invalid', async () => {
    mockVerify.mockImplementation((token: string) => {
      if (token === expiredToken) {
        const error: any = new Error('Token expired');
        error.name = 'TokenExpiredError';
        throw error;
      }
      if (token === invalidRefreshToken) {
        throw new Error('Invalid token');
      }
      return {};
    });

    const req = createRequest(expiredToken, invalidRefreshToken);
    const res = await jwtRefreshMiddleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost/login');
  });

  it('should redirect to login if no refresh token', async () => {
    mockVerify.mockImplementation(() => {
      const error: any = new Error('Token expired');
      error.name = 'TokenExpiredError';
      throw error;
    });

    const req = createRequest(expiredToken);
    const res = await jwtRefreshMiddleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost/login');
  });
});
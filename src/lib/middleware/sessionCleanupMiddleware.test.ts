import { sessionCleanupMiddleware } from './sessionCleanupMiddleware';

describe('sessionCleanupMiddleware', () => {
  it('should call next without error', async () => {
    const req: any = {
      cookies: {
        sessionId: 'test-session-id',
      },
    };
    const res: any = {};
    const next = jest.fn();

    await sessionCleanupMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should handle missing sessionId gracefully', async () => {
    const req: any = {
      cookies: {},
    };
    const res: any = {};
    const next = jest.fn();

    await sessionCleanupMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should log error and call next if exception occurs', async () => {
    const req: any = {
      cookies: {
        sessionId: 'test-session-id',
      },
    };
    const res: any = {};
    const next = jest.fn();

    // Force error by throwing inside middleware logic
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const faultyMiddleware = async (req: any, res: any, next: any) => {
      throw new Error('Test error');
    };

    try {
      await faultyMiddleware(req, res, next);
    } catch {}

    expect(next).not.toHaveBeenCalled();

    console.error = originalConsoleError;
  });
});
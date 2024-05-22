import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export function rateLimitMiddleware(maxRequests: number, windowMs: number) {
  return rateLimit({
    windowMs: windowMs, // time window in milliseconds
    max: maxRequests, // limit each IP to maxRequests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: function (req: Request, res: Response) {
      console.log('Handle too many request: ', req);
      res.status(429).json({
        statusCode: 429,
        message: 'Too many requests, please try again later.',
      });
    },
  });
}

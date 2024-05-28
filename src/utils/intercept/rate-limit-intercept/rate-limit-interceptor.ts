// rate-limit.interceptor.ts
import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { Observable } from 'rxjs';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private limiter: any;

  constructor(maxRequests: number, windowMs: number) {
    this.limiter = rateLimit({
      windowMs: windowMs, // time window in milliseconds
      max: maxRequests, // limit each IP to maxRequests per windowMs
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      handler: function (req: Request, res: Response) {
        res.status(429).json({
          statusCode: 429,
          message: 'Too many requests, please try again later.',
        });
      },
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    return new Observable(subscriber => {
      this.limiter(request, response, (err: any) => {
        if (err) {
          subscriber.error(err);
        } else {
          next.handle().subscribe({
            next: v => subscriber.next(v),
            error: e => subscriber.error(e),
            complete: () => subscriber.complete(),
          });
        }
      });
    });
  }
}

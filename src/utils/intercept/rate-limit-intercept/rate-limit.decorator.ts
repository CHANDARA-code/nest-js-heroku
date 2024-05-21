import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { RateLimitInterceptor } from './rate-limit-interceptor';

export function RateLimit(maxRequests: number, windowMs: number) {
  return applyDecorators(UseInterceptors(new RateLimitInterceptor(maxRequests, windowMs)));
}

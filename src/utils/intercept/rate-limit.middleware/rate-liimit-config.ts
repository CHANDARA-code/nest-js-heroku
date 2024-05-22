import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { rateLimitMiddleware } from './rate-limit.middleware';
import { LIMIT_DURATION, LIMIT_REQUEST } from 'src/utils/constants';
export class RateLimitConfig {
  static applyRateLimit(consumer: MiddlewareConsumer) {
    consumer
      .apply(rateLimitMiddleware(LIMIT_REQUEST, LIMIT_DURATION)) // 100 requests per 15 minutes
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

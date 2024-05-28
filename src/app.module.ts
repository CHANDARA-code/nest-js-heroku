import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RateLimitConfig } from '@utils/intercept';
import { loadAllModules, loadDatabase, loadEnv, loadLocalization, loadPublicDirector } from './load.config';

@Module({
  imports: [loadEnv, loadPublicDirector, loadDatabase, loadLocalization, ...loadAllModules],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    RateLimitConfig.applyRateLimit(consumer);
  }
}

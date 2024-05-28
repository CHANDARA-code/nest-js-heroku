import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RateLimitConfig } from '@utils/intercept';
import { loadAllModules, loadDatabase, loadEnvDev, loadLocalization, loadPublicDirector } from './load.config';

@Module({
  imports: [loadEnvDev, loadPublicDirector, loadDatabase, loadLocalization, ...loadAllModules],
})
export class AppModuleDev {
  configure(consumer: MiddlewareConsumer) {
    RateLimitConfig.applyRateLimit(consumer);
  }
}

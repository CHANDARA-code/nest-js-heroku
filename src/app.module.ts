import { MiddlewareConsumer, Module } from '@nestjs/common';
import databaseConfig from '@config/database.config';
import authConfig from '@config/auth.config';
import appConfig from '@config/app.config';
import mailConfig from '@config/mail.config';
import fileConfig from '@config/file.config';
import facebookConfig from '@config/facebook.config';
import googleConfig from '@config/google.config';
import twitterConfig from '@config/twitter.config';
import appleConfig from '@config/apple.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from '@config/config.type';
import { RateLimitConfig } from '@utils/intercept';
import { FilesModule } from './api/files/files.module';
import { AuthModule } from './api/auth/auth.module';
import { AuthAppleModule } from './api/auth-apple/auth-apple.module';
import { AuthFacebookModule } from './api/auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './api/auth-google/auth-google.module';
import { AuthTwitterModule } from './api/auth-twitter/auth-twitter.module';
import { ForgotModule } from './api/forgot/forgot.module';
import { HomeModule } from './api/home/home.module';
import { ArticlesModule } from './api/articles/articles.module';
import { MailModule } from './api/mail/mail.module';
import { MailerModule } from './core/mailer/mailer.module';
import { UsersModule } from './api/users/users.module';
import { SessionModule } from './api/session/session.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AssetsEnum } from '@utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        twitterConfig,
        appleConfig,
      ],
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, AssetsEnum.public),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: {
          path: path.join(__dirname, AssetsEnum.i18n),
          watch: true,
        },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    AuthAppleModule,
    ForgotModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    ArticlesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    RateLimitConfig.applyRateLimit(consumer);
  }
}

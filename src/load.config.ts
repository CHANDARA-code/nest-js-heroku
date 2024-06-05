import {
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
  FirebaseAdminModule,
} from '@/api';
import {
  databaseConfig,
  appConfig,
  appleConfig,
  authConfig,
  facebookConfig,
  fileConfig,
  firebaseConfig,
  googleConfig,
  mailConfig,
  twitterConfig,
} from '@/config';
import { AllConfigType } from '@/config/config.type';
import { TypeOrmConfigService } from '@/database/typeorm-config.service';
import { AssetsEnum } from '@/utils/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const loadEnv = ConfigModule.forRoot({
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
    firebaseConfig,
  ],
  envFilePath: ['.env'],
});

export const loadPublicDirector = ServeStaticModule.forRoot({
  rootPath: path.join(__dirname, AssetsEnum.public),
});

export const loadDatabase = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

export const loadLocalization = I18nModule.forRootAsync({
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
});
export const loadAllModules = [
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
  FirebaseAdminModule,
];

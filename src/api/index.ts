import { ArticlesModule } from '@/api/articles/articles.module';
import { AuthAppleModule } from '@/api/auth-apple/auth-apple.module';
import { AuthFacebookModule } from '@/api/auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from '@/api/auth-google/auth-google.module';
import { AuthTwitterModule } from '@/api/auth-twitter/auth-twitter.module';
import { AuthModule } from '@/api/auth/auth.module';
import { FilesModule } from '@/api/files/files.module';
import { FirebaseAdminModule } from '@/api/firebase-admin/firebase-admin.module';
import { ForgotModule } from '@/api/forgot/forgot.module';
import { HomeModule } from '@/api/home/home.module';
import { MailModule } from '@/api/mail/mail.module';
import { SessionModule } from '@/api/session/session.module';
import { UsersModule } from '@/api/users/users.module';
import { MailerModule } from '@/core/mailer/mailer.module';

export {
  ArticlesModule,
  AuthAppleModule,
  AuthFacebookModule,
  AuthTwitterModule,
  AuthModule,
  FilesModule,
  FirebaseAdminModule,
  ForgotModule,
  HomeModule,
  MailModule,
  SessionModule,
  UsersModule,
  AuthGoogleModule,
  MailerModule,
};

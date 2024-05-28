import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from '@api/users/users.module';
import { IsExist } from '@utils/validators/is-exists.validator';
import { IsNotExist } from '@utils/validators/is-not-exists.validator';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { ForgotModule } from '../forgot/forgot.module';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [UsersModule, ForgotModule, SessionModule, PassportModule, MailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [IsExist, IsNotExist, AuthService, JwtStrategy, JwtRefreshStrategy, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}

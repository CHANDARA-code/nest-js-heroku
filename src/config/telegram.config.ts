import { registerAs } from '@nestjs/config';
import { TelegramConfig } from './config.type';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '@utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  TELEGRAM_TOKEN: string;
}

export default registerAs<TelegramConfig>('telegram', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    token: process.env.TELEGRAM_TOKEN,
  };
});

import { registerAs } from '@nestjs/config';
import { FirebaseConfig } from './config.type';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '@utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  SERVICE_ACCOUNT?: string;
}

export default registerAs<FirebaseConfig>('firebase', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    serviceAccount: process.env.SERVICE_ACCOUNT,
  };
});

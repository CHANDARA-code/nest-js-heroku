import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AllConfigType } from '@config/config.type';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import helmet from 'helmet';
import { AppExceptionFilter } from '@core/exception/app-exception/app-exception-filter';
import { AppModuleDev } from './app.module.dev';
import validationOptions from '@utils/validation-options';

async function bootstrap() {
  Logger.warn(`
  Running in Development mode: 
  Server: http://localhost:3000/
  Document: http://localhost:3000/docs
  Database Viewer: http://localhost:8080
  Mail Viewer: http://localhost:1080
  `);
  const app = await NestFactory.create(AppModuleDev, {
    cors: true,
    snapshot: true,
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.ms(),
            nestWinstonModuleUtilities.format.nestLike('My Project Boilerplate', {
              colors: true,
              prettyPrint: true,
              processId: true,
            }),
          ),
        }),
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d', // keep logs for 30 days
        }),
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d', // keep logs for 30 days
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf(info => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });
  useContainer(app.select(AppModuleDev), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const options = new DocumentBuilder().setTitle('API').setDescription('API docs').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.use(helmet());
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();

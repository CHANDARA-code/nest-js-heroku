import { AppModule } from '@/app.module';
import { helmetConfig, logger as AppLogger } from '@/config';
import { AllConfigType } from '@/config/config.type';
import { AppExceptionFilter } from '@/core';
import validationOptions from '@/utils/validation-options';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    snapshot: true,
    logger: AppLogger,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
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
  app.use(helmet(helmetConfig));
  await app.listen(configService.getOrThrow('app.port', { infer: true }));

  console.warn(`

  🍀🍀🍀✨✨✨ Running in Production mode ✨✨✨🍀🍀🍀

            Server: http://localhost:3000/

            Document: http://localhost:3000/docs

            Database Viewer: http://localhost:8080

            Mail Viewer: http://localhost:1080

  🍀🍀🍀✨✨✨ Running in Development mode ✨✨✨🍀🍀🍀

  `);
}
void bootstrap();

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { createSwaggerConfig } from './config/swagger/swagger-config.factory';
import { createSessionConfig } from './config/session/session-config.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true
  }))

  app.use(
    session(createSessionConfig(configService))
  )

  const document = SwaggerModule.createDocument(app, createSwaggerConfig());
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();

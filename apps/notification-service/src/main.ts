/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setUpSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription('The Notification Service API description')
    .setVersion('1.0')
    .addTag('notification')
    .build();
  SwaggerModule.setup(
    'api-docs',
    app,
    SwaggerModule.createDocument(app, options)
  );
}

function runServer(app: INestApplication, globalPrefix: string) {
  const port = process.env.PORT || 3003;
  app
    .listen(port)
    .then(() => {
      Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
      );
    })
    .catch((error) => {
      Logger.error('💥 Failed to start the application', error);
    });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'notification-service';
  app.setGlobalPrefix(globalPrefix);

  setUpSwagger(app);
  runServer(app, globalPrefix);
}

bootstrap();

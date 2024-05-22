import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BootMiddleware } from './common/middlewares/boot.middleware';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });
  const configService = app.get(ConfigService);
  app.use(BootMiddleware);
  await app.listen(configService.get('PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then().catch();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // convierte automáticamente las solicitudes de entrada a instancias de clase (DTO)
    }),
  );
  await app.listen(8000);
}
bootstrap();

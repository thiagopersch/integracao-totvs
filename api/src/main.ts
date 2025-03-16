import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './utils/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma os dados recebidos no tipo do DTO
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Rejeita requisições com propriedades extras
    }),
  );
  app.enableCors({
    origin: process.env.URL_CLIENT,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });
  await app.listen(port);
  console.log(`🚀 Initialized server in port: ${port}`);
}

bootstrap();

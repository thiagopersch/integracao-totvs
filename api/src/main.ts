import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './utils/HttpExceptionFilter';
import { VALIDATION_MESSAGES } from './utils/validation-messages';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints || {};
          const field = error.property;
          const messages = Object.keys(constraints).map((key) => {
            if (key === 'isNotEmpty')
              return VALIDATION_MESSAGES.isNotEmpty(field);
            if (key === 'isString') return VALIDATION_MESSAGES.isString(field);
            if (key === 'isNumber') return VALIDATION_MESSAGES.isNumber(field);
            if (key === 'isBoolean')
              return VALIDATION_MESSAGES.isBoolean(field);
            if (key === 'maxLength') {
              const max = constraints[key].match(
                /must be shorter than or equal to (\d+)/,
              )?.[1];
              return VALIDATION_MESSAGES.maxLength(field, Number(max));
            }
            if (key === 'max') {
              const max = constraints[key].match(
                /must be less than or equal to (\d+)/,
              )?.[1];
              return `${field}: O valor deve ser menor ou igual a ${max}.`;
            }
            return constraints[key];
          });
          return messages.join(', ');
        });
        return new BadRequestException(messages);
      },
      errorHttpStatusCode: 422,
      validationError: {
        target: false,
        value: true,
      },
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

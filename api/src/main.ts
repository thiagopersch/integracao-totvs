import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  app.setGlobalPrefix('api');
  app.enableCors({
    origin:
      process.env.APP_ENV === 'production'
        ? process.env.URL_CLIENT
        : process.env.URL_CLIENT, //Dev
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`🚀 Initialized server in port: ${port}`);
}
bootstrap();

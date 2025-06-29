import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://iceberg-belyo.vercel.app'
    ],
  });

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();

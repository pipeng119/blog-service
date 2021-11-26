import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('secret'));
  app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1000 * 60 * 60 } }))
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Liquid } from 'liquidjs';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const engine = new Liquid();

  app.engine('liquid', engine.express());
  app.useStaticAssets(path.join(process.cwd(), 'public'));
  app.setBaseViewsDir(path.join(process.cwd(), 'views'));
  app.setViewEngine('liquid');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

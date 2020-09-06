import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PORT } from './configuration';

/**
 * Run the application
 * @returns {Promise<void>}
 */
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  return app.listen(PORT);
}
bootstrap();

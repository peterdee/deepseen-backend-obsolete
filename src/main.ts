import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
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
    new FastifyAdapter({
      logger: true,
    }),
  );
  
  app.register(helmet);
  
  // add a global prefix for the API routes
  app.setGlobalPrefix('api');

  return app.listen(
    PORT,
    () => console.log(`-- DEEPSEEN BACKEND: listening on port ${PORT}`),
  );
}

bootstrap();

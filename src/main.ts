import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { PORT } from './configuration';

/**
 * Run the application
 * @returns {Promise<void>}
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  return app.listen(PORT);
}
bootstrap();

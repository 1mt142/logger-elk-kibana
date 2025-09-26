import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger = app.get(CustomLoggerService);
  app.useLogger(logger);

  logger.log('Application starting...', 'Bootstrap');
  await app.listen(3000);
  logger.log('Application started on port 3000', 'Bootstrap');
}
bootstrap();

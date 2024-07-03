import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infra/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  await app.listen(3000);
}
bootstrap();

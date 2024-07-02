import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infra/modules/app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { ValidationPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

let cachedServer;
export const handler = async (event: APIGatewayEvent, context: Context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.enableVersioning();
    nestApp.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }
  return cachedServer(event, context);
};

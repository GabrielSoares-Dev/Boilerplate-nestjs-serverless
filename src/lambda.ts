import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infra/modules/app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';

let cachedServer;
export const handler = async (event: APIGatewayEvent, context: Context) => {
  console.log(process.env.DATABASE_URL);
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }
  return cachedServer(event, context);
};

import { HttpStatus, HttpException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Handler, SQSEvent } from 'aws-lambda';
import { AppModule } from '@infra/modules/app.module';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import { inputSQSNormalizer } from '@infra/utils/inputFunctionNormalizer.util';

export const handler: Handler = async (event: SQSEvent) => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const loggerService =
    appContext.get<LoggerServiceInterface>(LOGGER_SERVICE_TOKEN);
  try {
    const input = inputSQSNormalizer(event);
    loggerService.info('START example sqs');
    loggerService.debug('input', input);
    return {
      body: {
        statusCode: HttpStatus.OK,
        message: 'SQS example is working',
      },
      statusCode: HttpStatus.OK,
    };
  } catch (error) {
    const errorMessage = error.message;
    const httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

    loggerService.error('error', errorMessage);
    throw new HttpException(errorMessage, httpCode);
  }
};

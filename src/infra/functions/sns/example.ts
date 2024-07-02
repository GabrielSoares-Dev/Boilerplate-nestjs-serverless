import { HttpStatus, HttpException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Handler, SNSEvent } from 'aws-lambda';
import { AppModule } from '@infra/modules/app.module';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import { inputSNSNormalizer } from '@infra/utils/inputFunctionNormalizer.util';

export const handler: Handler = async (event: SNSEvent) => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const loggerService =
    appContext.get<LoggerServiceInterface>(LOGGER_SERVICE_TOKEN);
  try {
    const input = inputSNSNormalizer(event);
    loggerService.info('START example sns');
    loggerService.debug('input', input);
    return {
      body: {
        statusCode: HttpStatus.OK,
        message: 'SNS example is working',
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

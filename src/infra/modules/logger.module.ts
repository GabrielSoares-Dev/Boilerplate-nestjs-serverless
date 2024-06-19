import { Module, Global } from '@nestjs/common';
import { LoggerService } from '@infra';
import { LOGGER_SERVICE_TOKEN } from '@application';

@Global()
@Module({
  providers: [
    {
      useClass: LoggerService,
      provide: LOGGER_SERVICE_TOKEN,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}

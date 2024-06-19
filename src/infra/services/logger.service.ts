import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { LoggerServiceInterface } from '@application';

@Injectable()
export class LoggerService implements LoggerServiceInterface {
  private readonly logger = new Logger();
  private readonly context = process.env.APP_NAME;

  info(message: string, input: unknown[]): void {
    this.logger.log(`${this.context} ${message}`, input);
  }

  debug(message: string, input: unknown[]): void {
    this.logger.debug(`${this.context} ${message}`, input);
  }

  error(message: string, input: unknown[]): void {
    this.logger.error(`${this.context} ${message}`, 'error', input);
  }

  warning(message: string, input: unknown[]): void {
    this.logger.warn(`${this.context} ${message}`, input);
  }

  fatal(message: string, input: unknown[]): void {
    this.logger.fatal(`${this.context} ${message}`, input);
  }
}

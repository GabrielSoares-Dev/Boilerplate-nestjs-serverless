import {
  Controller,
  Post,
  Inject,
  Res,
  HttpStatus,
  HttpException,
  Body,
  HttpCode,
} from '@nestjs/common';
import { LoginSerializerInputDto } from '@infra/http/serializers/auth/login.serializer';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import { LoginUseCase } from '@application/useCases/auth/login.usecase';
import { Response } from 'express';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  private readonly context = 'AuthController';

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() input: LoginSerializerInputDto, @Res() res: Response) {
    this.loggerService.info(`START ${this.context} login`);
    this.loggerService.debug('input', input);
    try {
      const output = await this.loginUseCase.run(input);
      this.loggerService.debug('output', output);

      this.loggerService.info(`FINISH ${this.context} login`);

      const response = {
        statusCode: HttpStatus.OK,
        message: 'Authenticated',
        content: output,
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const isInvalidCredentialsError = errorMessage === 'Invalid credentials';
      if (isInvalidCredentialsError) httpCode = HttpStatus.UNAUTHORIZED;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }
}

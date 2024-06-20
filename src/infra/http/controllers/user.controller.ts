import {
  Controller,
  Post,
  Inject,
  Res,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { CreateUserSerializerInputDto } from '@infra';
import {
  LoggerServiceInterface,
  LOGGER_SERVICE_TOKEN,
  CreateUserUseCase,
} from '@application';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  private context = 'UserController';

  @Post()
  async create(
    @Body() input: CreateUserSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} create`);
    this.loggerService.debug('input', input);
    try {
      await this.createUserUseCase.run(input);

      this.loggerService.info(`FINISH ${this.context} create`);

      const response = {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const isAlreadyExistsError = errorMessage === 'User already exists';
      if (isAlreadyExistsError) httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(error.message, httpCode);
    }
  }
}

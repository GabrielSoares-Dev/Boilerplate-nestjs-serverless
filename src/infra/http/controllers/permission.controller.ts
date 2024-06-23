import {
  Controller,
  Post,
  Inject,
  Res,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { CreatePermissionSerializerInputDto } from '@infra/http/serializers/permission/create.serializer';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import { CreatePermissionUseCase } from '@application/useCases/permission/create.usecase';
import { Response } from 'express';

@Controller({ path: 'permission', version: '1' })
export class PermissionController {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,
    private createUseCase: CreatePermissionUseCase,
  ) {}

  private context = 'PermissionController';

  @Post()
  async create(
    @Body() input: CreatePermissionSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} create`);
    this.loggerService.debug('input', input);
    try {
      await this.createUseCase.run(input);

      this.loggerService.info(`FINISH ${this.context} create`);

      const response = {
        statusCode: HttpStatus.CREATED,
        message: 'Permission created successfully',
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const isAlreadyExistsError = errorMessage === 'Permission already exists';
      if (isAlreadyExistsError) httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }
}

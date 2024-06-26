import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Inject,
  Res,
  HttpStatus,
  HttpException,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { CreateRoleSerializerInputDto } from '@infra/http/serializers/role/create.serializer';
import { FindRoleSerializerInputDto } from '@infra/http/serializers/role/find.serializer';
import {
  UpdateRoleSerializerInputDto,
  UpdateRoleSerializerInputParamDto,
} from '@infra/http/serializers/role/update.serializer';
import { DeleteRoleSerializerInputDto } from '@infra/http/serializers/role/delete.serializer';
import { SyncPermissionsSerializerInputDto } from '@infra/http/serializers/role/syncPermissions.serializer';
import { UnsyncPermissionsSerializerInputDto } from '@infra/http/serializers/role/unsyncPermissions.serializer';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import { CreateRoleUseCase } from '@application/useCases/role/create.usecase';
import { FindAllRolesUseCase } from '@application/useCases/role/findAll.usecase';
import { FindRoleUseCase } from '@application/useCases/role/find.usecase';
import { UpdateRoleUseCase } from '@application/useCases/role/update.usecase';
import { DeleteRoleUseCase } from '@application/useCases/role/delete.usecase';
import { SyncPermissionsUseCase } from '@application/useCases/role/syncPermissions.usecase';
import { UnsyncPermissionsUseCase } from '@application/useCases/role/unsyncPermissions.usecase';
import { Response } from 'express';

@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,
    private createUseCase: CreateRoleUseCase,
    private findAllUseCase: FindAllRolesUseCase,
    private findUseCase: FindRoleUseCase,
    private updateUseCase: UpdateRoleUseCase,
    private deleteUseCase: DeleteRoleUseCase,
    private syncPermissionsUseCase: SyncPermissionsUseCase,
    private unsyncPermissionsUseCase: UnsyncPermissionsUseCase,
  ) {}

  private context = 'RoleController';

  @Post()
  async create(
    @Body() input: CreateRoleSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} create`);
    this.loggerService.debug('input', input);
    try {
      await this.createUseCase.run(input);

      this.loggerService.info(`FINISH ${this.context} create`);

      const response = {
        statusCode: HttpStatus.CREATED,
        message: 'Role created successfully',
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const isAlreadyExistsError = errorMessage === 'Role already exists';
      if (isAlreadyExistsError) httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    this.loggerService.info(`START ${this.context} findAll`);
    try {
      const output = await this.findAllUseCase.run();
      this.loggerService.debug('output', output);

      this.loggerService.info(`FINISH ${this.context} findAll`);

      const response = {
        statusCode: HttpStatus.OK,
        message: 'Found roles',
        content: output,
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      const httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }

  @Get(':id')
  async findOne(
    @Param() input: FindRoleSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} findOne`);
    this.loggerService.debug('input', input);
    try {
      const output = await this.findUseCase.run({ id: Number(input.id) });
      this.loggerService.debug('output', output);

      this.loggerService.info(`FINISH ${this.context} findOne`);

      const response = {
        statusCode: HttpStatus.OK,
        message: 'Role found',
        content: output,
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const invalidIdError = errorMessage === 'Invalid id';
      if (invalidIdError) httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }

  @Patch(':id')
  async update(
    @Param() params: UpdateRoleSerializerInputParamDto,
    @Body() input: UpdateRoleSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} update`);
    this.loggerService.debug('id', params.id);
    this.loggerService.debug('input', input);

    try {
      await this.updateUseCase.run({
        id: Number(params.id),
        ...input,
      });

      this.loggerService.info(`FINISH ${this.context} update`);

      const response = {
        statusCode: HttpStatus.OK,
        message: 'Role Updated successfully',
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const invalidIdError = errorMessage === 'Invalid id';
      if (invalidIdError) httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }

  @Delete(':id')
  async remove(
    @Param() input: DeleteRoleSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} remove`);
    this.loggerService.debug('input', input);

    try {
      await this.deleteUseCase.run({ id: Number(input.id) });
      this.loggerService.info(`FINISH ${this.context} remove`);

      const response = {
        statusCode: HttpStatus.OK,
        message: 'Role deleted successfully',
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const invalidIdError = errorMessage === 'Invalid id';
      if (invalidIdError) httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }

  @Post('sync-permissions')
  @HttpCode(HttpStatus.OK)
  async syncPermissions(
    @Body() input: SyncPermissionsSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} syncPermissions`);
    this.loggerService.debug('input', input);
    try {
      await this.syncPermissionsUseCase.run(input);

      this.loggerService.info(`FINISH ${this.context} syncPermissions`);

      const response = {
        statusCode: HttpStatus.OK,
        message: 'Role sync successfully',
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const isInvalidRole = errorMessage === 'Invalid role';
      const isInvalidPermission = errorMessage === 'Invalid permission';

      if (isInvalidRole || isInvalidPermission)
        httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }

  @Post('unsync-permissions')
  @HttpCode(HttpStatus.OK)
  async unsyncPermissions(
    @Body() input: UnsyncPermissionsSerializerInputDto,
    @Res() res: Response,
  ) {
    this.loggerService.info(`START ${this.context} unsyncPermissions`);
    this.loggerService.debug('input', input);
    try {
      await this.unsyncPermissionsUseCase.run(input);

      this.loggerService.info(`FINISH ${this.context} unsyncPermissions`);

      const response = {
        statusCode: HttpStatus.OK,
        message: 'Role unsync successfully',
      };
      return res.json(response);
    } catch (error) {
      const errorMessage = error.message;
      let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const isInvalidRole = errorMessage === 'Invalid role';
      const isInvalidPermission = errorMessage === 'Invalid permission';

      if (isInvalidRole || isInvalidPermission)
        httpCode = HttpStatus.BAD_REQUEST;

      this.loggerService.error('error', errorMessage);
      throw new HttpException(errorMessage, httpCode);
    }
  }
}

import { Module } from '@nestjs/common';
import { PermissionController } from '@infra/http/controllers/permission.controller';
import { CreatePermissionUseCase } from '@application/useCases/permission/create.usecase';
import { PERMISSION_REPOSITORY_TOKEN } from '@application/repositories/permission.repository';
import { PermissionRepository } from '@infra/repositories/permission.repository';

@Module({
  controllers: [PermissionController],
  providers: [
    CreatePermissionUseCase,
    {
      provide: PERMISSION_REPOSITORY_TOKEN,
      useClass: PermissionRepository,
    },
  ],
})
export class PermissionModule {}

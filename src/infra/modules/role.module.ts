import { Module } from '@nestjs/common';
import { RoleController } from '@infra/http/controllers/role.controller';
import { CreateRoleUseCase } from '@application/useCases/role/create.usecase';
import { FindAllRolesUseCase } from '@application/useCases/role/findAll.usecase';
import { FindRoleUseCase } from '@application/useCases/role/find.usecase';
import { UpdateRoleUseCase } from '@application/useCases/role/update.usecase';
import { DeleteRoleUseCase } from '@application/useCases/role/delete.usecase';
import { SyncPermissionsUseCase } from '@application/useCases/role/syncPermissions.usecase';
import { UnsyncPermissionsUseCase } from '@application/useCases/role/unsyncPermissions.usecase';
import { ROLE_REPOSITORY_TOKEN } from '@application/repositories/role.repository';
import { RoleRepository } from '@infra/repositories/role.repository';
import { PERMISSION_REPOSITORY_TOKEN } from '@application/repositories/permission.repository';
import { PermissionRepository } from '@infra/repositories/permission.repository';

@Module({
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    FindAllRolesUseCase,
    FindRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    SyncPermissionsUseCase,
    UnsyncPermissionsUseCase,
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: RoleRepository,
    },
    {
      provide: PERMISSION_REPOSITORY_TOKEN,
      useClass: PermissionRepository,
    },
  ],
})
export class RoleModule {}

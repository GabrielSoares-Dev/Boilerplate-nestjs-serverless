import { Module } from '@nestjs/common';
import { RoleController } from '@infra/http/controllers/role.controller';
import { CreateRoleUseCase } from '@application/useCases/role/create.usecase';
import { FindAllRolesUseCase } from '@application/useCases/role/findAll.usecase';
import { FindRoleUseCase } from '@application/useCases/role/find.usecase';
import { UpdateRoleUseCase } from '@application/useCases/role/update.usecase';
import { DeleteRoleUseCase } from '@application/useCases/role/delete.usecase';
import { ROLE_REPOSITORY_TOKEN } from '@application/repositories/role.repository';
import { RoleRepository } from '@infra/repositories/role.repository';

@Module({
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    FindAllRolesUseCase,
    FindRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: RoleRepository,
    },
  ],
})
export class RoleModule {}

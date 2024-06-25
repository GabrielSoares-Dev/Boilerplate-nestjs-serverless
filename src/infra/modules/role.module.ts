import { Module } from '@nestjs/common';
import { RoleController } from '@infra/http/controllers/role.controller';
import { CreateRoleUseCase } from '@application/useCases/role/create.usecase';
import { ROLE_REPOSITORY_TOKEN } from '@application/repositories/role.repository';
import { RoleRepository } from '@infra/repositories/role.repository';

@Module({
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: RoleRepository,
    },
  ],
})
export class RoleModule {}

import {
  CreateRoleRepositoryInputDto,
  CreateRoleRepositoryOutputDto,
} from '@application/dtos/repositories/role/create.dto';
import {
  UpdateRoleRepositoryInputDto,
  UpdateRoleRepositoryOutputDto,
} from '@application/dtos/repositories/role/update.dto';
import { FindRoleByNameRepositoryOutputDto } from '@application/dtos/repositories/role/findByName.dto';
import { FindAllRolesRepositoryOutputDto } from '@application/dtos/repositories/role/findAll.dto';
import { FindRoleRepositoryOutputDto } from '@application/dtos/repositories/role/find.dto';

export const ROLE_REPOSITORY_TOKEN = 'ROLE_REPOSITORY_TOKEN';

export interface RoleRepositoryInterface {
  create(
    input: CreateRoleRepositoryInputDto,
  ): Promise<CreateRoleRepositoryOutputDto>;
  update(
    input: UpdateRoleRepositoryInputDto,
  ): Promise<UpdateRoleRepositoryOutputDto>;
  findByName(name: string): Promise<FindRoleByNameRepositoryOutputDto>;
  findAll(): Promise<FindAllRolesRepositoryOutputDto>;
  find(id: number): Promise<FindRoleRepositoryOutputDto>;
}

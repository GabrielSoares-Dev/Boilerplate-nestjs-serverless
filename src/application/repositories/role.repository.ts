import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
} from '@application/dtos/repositories/role/create.dto';
import { FindByNameRepositoryOutputDto } from '@application/dtos/repositories/role/findByName.dto';
import { FindAllRepositoryOutputDto } from '@application/dtos/repositories/role/findAll.dto';

export const ROLE_REPOSITORY_TOKEN = 'ROLE_REPOSITORY_TOKEN';

export interface RoleRepositoryInterface {
  create(input: CreateRepositoryInputDto): Promise<CreateRepositoryOutputDto>;
  findByName(name: string): Promise<FindByNameRepositoryOutputDto>;
  findAll(): Promise<FindAllRepositoryOutputDto>;
}

import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
} from '@application/dtos/repositories/permission/create.dto';
import {
  UpdateRepositoryInputDto,
  UpdateRepositoryOutputDto,
} from '@application/dtos/repositories/permission/update.dto';
import { FindByNameRepositoryOutputDto } from '@application/dtos/repositories/permission/findByName.dto';
import { FindAllRepositoryOutputDto } from '@application/dtos/repositories/permission/findAll.dto';
import { FindRepositoryOutputDto } from '@application/dtos/repositories/permission/find.dto';

export const PERMISSION_REPOSITORY_TOKEN = 'PERMISSION_REPOSITORY_TOKEN';

export interface PermissionRepositoryInterface {
  create(input: CreateRepositoryInputDto): Promise<CreateRepositoryOutputDto>;
  update(input: UpdateRepositoryInputDto): Promise<UpdateRepositoryOutputDto>;
  findByName(name: string): Promise<FindByNameRepositoryOutputDto>;
  findAll(): Promise<FindAllRepositoryOutputDto>;
  find(id: number): Promise<FindRepositoryOutputDto>;
}

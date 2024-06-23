import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
} from '@application/dtos/repositories/permission/create.dto';
import { FindByNameRepositoryOutputDto } from '@application/dtos/repositories/permission/findByName.dto';

export const PERMISSION_REPOSITORY_TOKEN = 'PERMISSION_REPOSITORY_TOKEN';

export interface PermissionRepositoryInterface {
  create(input: CreateRepositoryInputDto): Promise<CreateRepositoryOutputDto>;
  findByName(name: string): Promise<FindByNameRepositoryOutputDto>;
}

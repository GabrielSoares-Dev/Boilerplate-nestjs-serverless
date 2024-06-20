import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
  FindByEmailRepositoryOutputDto,
} from '@application';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export interface UserRepositoryInterface {
  create(input: CreateRepositoryInputDto): Promise<CreateRepositoryOutputDto>;
  findByEmail(email: string): Promise<FindByEmailRepositoryOutputDto>;
}

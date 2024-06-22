import { CreateRepositoryInputDto, CreateRepositoryOutputDto } from '@application/dtos/repositories/user/create.dto';
import { FindByEmailRepositoryOutputDto } from '@application/dtos/repositories/user/findByEmail.dto';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export interface UserRepositoryInterface {
  create(input: CreateRepositoryInputDto): Promise<CreateRepositoryOutputDto>;
  findByEmail(email: string): Promise<FindByEmailRepositoryOutputDto>;
}

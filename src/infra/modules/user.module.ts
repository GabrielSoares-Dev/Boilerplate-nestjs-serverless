import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@application/useCases/user/create.usecase';
import { USER_REPOSITORY_TOKEN } from '@application/repositories/user.repository';
import { ROLE_REPOSITORY_TOKEN } from '@application/repositories/role.repository';
import { CRYPTOGRAPHY_SERVICE_TOKEN } from '@application/services/cryptography.service';
import { UserController } from '@infra/http/controllers/user.controller';
import { UserRepository } from '@infra/repositories/user.repository';
import { RoleRepository } from '@infra/repositories/role.repository';
import { CryptographyService } from '@infra/services/cryptography.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: RoleRepository,
    },
    {
      provide: CRYPTOGRAPHY_SERVICE_TOKEN,
      useClass: CryptographyService,
    },
  ],
})
export class UserModule {}

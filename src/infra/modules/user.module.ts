import { Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  USER_REPOSITORY_TOKEN,
  CRYPTOGRAPHY_SERVICE_TOKEN,
} from '@application';
import { UserController, UserRepository, CryptographyService } from '@infra';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: CRYPTOGRAPHY_SERVICE_TOKEN,
      useClass: CryptographyService,
    },
  ],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { CreateUserUseCase, USER_REPOSITORY_TOKEN } from '@application';
import { UserController, UserRepository } from '@infra';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@application/useCases';
import { UserController } from '@infra/http';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}

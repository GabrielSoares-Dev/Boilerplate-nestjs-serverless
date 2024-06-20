import { Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '@application/useCases';

@Controller('user')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  create() {
    return this.createUserUseCase.run();
  }
}

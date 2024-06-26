import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/services/prisma.service';
import { UserRepositoryInterface } from '@application/repositories/user.repository';
import {
  CreateUserRepositoryInputDto,
  CreateUserRepositoryOutputDto,
} from '@application/dtos/repositories/user/create.dto';
import { FindUserByEmailRepositoryOutputDto } from '@application/dtos/repositories/user/findByEmail.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.user;

  protected defaultFieldsToReturn = {
    id: true,
    name: true,
    email: true,
    phoneNumber: true,
    roleId: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(
    input: CreateUserRepositoryInputDto,
  ): Promise<CreateUserRepositoryOutputDto> {
    return this.model.create({
      data: input,
      select: this.defaultFieldsToReturn,
    });
  }

  async findByEmail(
    email: string,
  ): Promise<FindUserByEmailRepositoryOutputDto> {
    return this.model.findFirst({
      where: {
        email,
      },
      select: this.defaultFieldsToReturn,
    });
  }
}

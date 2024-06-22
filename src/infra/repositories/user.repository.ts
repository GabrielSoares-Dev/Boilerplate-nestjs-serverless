import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/services/prisma.service';
import { UserRepositoryInterface } from '@application/repositories/user.repository';
import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
} from '@application/dtos/repositories/user/create.dto';
import { FindByEmailRepositoryOutputDto } from '@application/dtos/repositories/user/findByEmail.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.user;

  protected defaultFieldsToReturn = {
    id: true,
    name: true,
    email: true,
    phoneNumber: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(
    input: CreateRepositoryInputDto,
  ): Promise<CreateRepositoryOutputDto> {
    return this.model.create({
      data: input,
      select: this.defaultFieldsToReturn,
    });
  }

  async findByEmail(email: string): Promise<FindByEmailRepositoryOutputDto> {
    return this.model.findFirst({
      where: {
        email,
      },
      select: this.defaultFieldsToReturn,
    });
  }
}

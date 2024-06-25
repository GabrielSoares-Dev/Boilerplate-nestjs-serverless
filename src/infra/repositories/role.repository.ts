import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/services/prisma.service';
import { RoleRepositoryInterface } from '@application/repositories/role.repository';
import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
} from '@application/dtos/repositories/role/create.dto';
import { FindByNameRepositoryOutputDto } from '@application/dtos/repositories/role/findByName.dto';

@Injectable()
export class RoleRepository implements RoleRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.role;

  protected defaultFieldsToReturn = {
    id: true,
    name: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  };

  protected softDeleteClause = {
    deletedAt: null,
  };

  async create(
    input: CreateRepositoryInputDto,
  ): Promise<CreateRepositoryOutputDto> {
    return this.model.create({
      data: input,
      select: this.defaultFieldsToReturn,
    });
  }

  async findByName(name: string): Promise<FindByNameRepositoryOutputDto> {
    return this.model.findFirst({
      where: {
        ...this.softDeleteClause,
        name,
      },
      select: this.defaultFieldsToReturn,
    });
  }
}

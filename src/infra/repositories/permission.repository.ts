import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/services/prisma.service';
import { PermissionRepositoryInterface } from '@application/repositories/permission.repository';
import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
} from '@application/dtos/repositories/permission/create.dto';
import {
  UpdateRepositoryInputDto,
  UpdateRepositoryOutputDto,
} from '@application/dtos/repositories/permission/update.dto';
import { FindByNameRepositoryOutputDto } from '@application/dtos/repositories/permission/findByName.dto';
import { FindAllRepositoryOutputDto } from '@application/dtos/repositories/permission/findAll.dto';
import { FindRepositoryOutputDto } from '@application/dtos/repositories/permission/find.dto';
import { DeleteRepositoryOutputDto } from '@application/dtos/repositories/permission/delete.dto';

@Injectable()
export class PermissionRepository implements PermissionRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.permission;

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

  async update(
    input: UpdateRepositoryInputDto,
  ): Promise<UpdateRepositoryOutputDto> {
    return this.model.update({
      where: {
        ...this.softDeleteClause,
        id: input.id,
      },
      data: {
        name: input.name,
        description: input.description,
      },
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

  async findAll(): Promise<FindAllRepositoryOutputDto> {
    return this.model.findMany({
      select: this.defaultFieldsToReturn,
      where: { ...this.softDeleteClause },
    });
  }

  async find(id: number): Promise<FindRepositoryOutputDto> {
    return this.model.findFirst({
      where: { ...this.softDeleteClause, id },
      select: this.defaultFieldsToReturn,
    });
  }

  async delete(id: number): Promise<DeleteRepositoryOutputDto> {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

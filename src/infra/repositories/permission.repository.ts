import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/services/prisma.service';
import { PermissionRepositoryInterface } from '@application/repositories/permission.repository';
import {
  CreateRepositoryInputDto,
  CreateRepositoryOutputDto,
} from '@application/dtos/repositories/permission/create.dto';
import { FindByNameRepositoryOutputDto } from '@application/dtos/repositories/permission/findByName.dto';
import { FindAllRepositoryOutputDto } from '@application/dtos/repositories/permission/findAll.dto';
import { FindRepositoryOutputDto } from '@application/dtos/repositories/permission/find.dto';

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
        name,
      },
      select: this.defaultFieldsToReturn,
    });
  }

  async findAll(): Promise<FindAllRepositoryOutputDto> {
    return this.model.findMany({ select: this.defaultFieldsToReturn });
  }

  async find(id: number): Promise<FindRepositoryOutputDto> {
    return this.model.findFirst({
      where: { id },
      select: this.defaultFieldsToReturn,
    });
  }
}

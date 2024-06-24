import { prisma } from '@test/helpers/db/prisma.client';

const model = prisma.permission;

interface CreateInputDto {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const createPermission = async (input: CreateInputDto) => {
  return model.create({ data: input });
};

export const deletePermissions = async () => {
  return model.deleteMany({});
};

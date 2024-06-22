import { prisma } from '@test/helpers/db/prisma.client';

const model = prisma.user;

interface CreateInputDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export const createUser = async (input: CreateInputDto) => {
  return model.create({ data: input });
};

export const deleteUsers = async () => {
  return model.deleteMany({});
};

import { prisma } from '@test/helpers/db/prisma.client';
import { faker } from '@faker-js/faker';

const model = prisma.user;

const fieldsToReturn = {
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
  createdAt: true,
  updatedAt: true,
};

export const create = async () => {
  return model.create({
    data: {
      id: faker.number.int({ max: 100 }),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.number(),
    },
    select: fieldsToReturn,
  });
};

export const deleteUsers = async () => {
  return model.deleteMany({});
};

import { prisma } from '../helpers/db/prisma.client';
import { cleanDatabase } from '../helpers/db/cleanDatabase';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await cleanDatabase();
  await prisma.$disconnect();
});

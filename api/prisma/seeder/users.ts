import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createRandomUsers = async (): Promise<void> => {
  for (let i = 0; i < 10; i++) {
    const passwordHash = await bcrypt.hash(faker.internet.password(), 10);
    await prisma.user.upsert({
      create: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        change_password: faker.datatype.boolean(),
        status: faker.datatype.boolean(),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
      },
      update: {},
      where: { id: faker.string.uuid() },
      omit: { password: true },
    });
  }
};

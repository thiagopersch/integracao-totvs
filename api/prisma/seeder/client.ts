import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRandomClients = async (): Promise<void> => {
  for (let i = 0; i < 10; i++) {
    await prisma.client.createMany({
      data: [
        {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          link_crm: faker.internet.url(),
          site: faker.internet.url(),
          status: faker.datatype.boolean(),
        },
      ],
    });

    await prisma.client.upsert({
      create: {
        id: faker.string.uuid(),
        name: 'Rubeus',
        link_crm: 'https://crmpadrao.apprubeus.com.br',
        site: 'https://rubeus.com',
        status: true,
      },
      update: {},
      where: { link_crm: 'https://crmpadrao.apprubeus.com.br' },
    });
  }
};

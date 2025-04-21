import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRandomTbc = async (): Promise<void> => {
  /* Create Clients */
  const rubeus = await prisma.client.upsert({
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

  /* Create TBC */
  await prisma.tbc.createMany({
    data: [
      {
        id: faker.string.uuid(),
        name: process.env.TBC_NAME,
        client_id: rubeus.id,
        link: process.env.TBC_LINK,
        user: process.env.TBC_USER,
        password: process.env.TBC_PASSWORD,
        not_required_license: true,
        status: true,
      },
    ],
    skipDuplicates: true,
  });
};

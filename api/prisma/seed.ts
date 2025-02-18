import { PrismaClient } from '@prisma/client';
import { createRandomUsers } from './seeder/users';

const prisma = new PrismaClient();

async function main() {
  await createRandomUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

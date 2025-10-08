import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password1 = (await bcrypt.hash('password', 10)) as string;
  const password2 = (await bcrypt.hash('password', 10)) as string;

  await prisma.admin.createMany({
    data: [
      { username: 'admin', password: password1, role: 'REVIEWER' },
      { username: 'john_doe', password: password2, role: 'REVIEWER' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log('Seed complete'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v5 as uuidv5 } from 'uuid';
const NAMESPACE = '7d444840-9dc0-11d1-b245-5ffdce74fad2';
const prisma = new PrismaClient();

async function main() {
  console.log('Seed started');
  const password1 = await bcrypt.hash('password', 10);
  const password2 = await bcrypt.hash('password', 10);

  await prisma.user.createMany({
    data: [
      { email: 'admin1@seczambia.com', password: password1, role: 'ADMIN' },
      { email: 'admin2@seczambia.com', password: password2, role: 'ADMIN' },
    ],
    skipDuplicates: true,
  });

  // for (const proposal of dummyProposals) {
  //   const id = uuidv5(proposal.projectTitle + proposal.organization, NAMESPACE);

  //   await prisma.proposal.upsert({
  //     where: { id }, // now using unique id
  //     update: {},
  //     create: { id, ...proposal } as unknown as Prisma.ProposalCreateInput,
  //   });
  // }
}

main()
  .then(() => console.log('Seed complete'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

const dummyProposals = [];

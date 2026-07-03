import { Prisma } from '@prisma/client';

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    projectOwner: true;
    admin: true;
  };
}>;

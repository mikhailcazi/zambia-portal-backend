import { Prisma, UserRole } from '@prisma/client';

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    projectOwner: true;
    admin: true;
  };
}>;

export interface JwtUser {
  sub: number;
  email: string;
  role: UserRole;
}

export interface JwtRequest extends Request {
  user: JwtUser;
}

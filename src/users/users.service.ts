import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        projectOwner: true,
        admin: true,
      },
    });
  }
}

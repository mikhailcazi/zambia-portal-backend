import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string) {
    return await this.prisma.admin.findFirst({
      where: {
        username: username,
      },
    });
  }
}

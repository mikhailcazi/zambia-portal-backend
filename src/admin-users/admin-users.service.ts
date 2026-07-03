import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  // async findOneUser(email: string) {
  //   return await this.prisma.user.findFirst({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }

  async findOne(userId: number) {
    return await this.prisma.admin.findFirst({
      where: {
        userId: userId,
      },
    });
  }
}

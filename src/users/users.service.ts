import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
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

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        lastLoginAt: true,
        isVerified: true,

        projectOwner: {
          select: {
            name: true,
            organization: true,
            location: true,
            position: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectOwnerDto } from './dto/create-project-owner.dto';
import { UpdateProjectOwnerDto } from './dto/update-project-owner.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class ProjectOwnerService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectOwnerDto: CreateProjectOwnerDto) {
    const token = randomBytes(32).toString('hex');

    const hashedPassword = await bcrypt.hash(
      createProjectOwnerDto.password,
      10,
    );

    const owner = await this.prisma.projectOwner.create({
      data: {
        ...createProjectOwnerDto,
        password: hashedPassword,
        isVerified: false,
        verifyToken: token,
        verifyTokenExp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      },
    });

    // const link = `https://yourapp.com/auth/verify?token=${token}`;

    const { password, ...safeOwner } = owner;

    return safeOwner;
  }

  async verify(token: string) {
    const user = await this.prisma.projectOwner.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExp: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequestException('Invalid token');

    return this.prisma.projectOwner.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExp: null,
      },
    });
  }

  findAll() {
    return this.prisma.projectOwner.findMany();
  }

  findOne(id: number) {
    return this.prisma.projectOwner.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProjectOwnerDto: UpdateProjectOwnerDto) {
    return this.prisma.projectOwner.update({
      where: { id },
      data: updateProjectOwnerDto,
    });
  }

  remove(id: number) {
    return this.prisma.projectOwner.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

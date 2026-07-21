import { Injectable } from '@nestjs/common';
import { UpdateProjectOwnerDto } from './dto/update-project-owner.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjectOwnerService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.projectOwner.findMany();
  }

  findOne(id: number) {
    return this.prisma.projectOwner.findUnique({
      where: { id },
    });
  }

  update(userId: number, updateProjectOwnerDto: UpdateProjectOwnerDto) {
    return this.prisma.projectOwner.update({
      where: { userId: userId },
      data: updateProjectOwnerDto,
    });
  }

  // remove(id: number) {
  //   return this.prisma.projectOwner.update({
  //     where: { id },
  //     data: { deletedAt: new Date() },
  //   });
  // }

  // async create(createProjectOwnerDto: CreateProjectOwnerDto) {
  //   const token = randomBytes(32).toString('hex');

  //   const hashedPassword = await bcrypt.hash(
  //     createProjectOwnerDto.password,
  //     10,
  //   );

  //   const owner = await this.prisma.projectOwner.create({
  //     data: {
  //       ...createProjectOwnerDto,
  //       password: hashedPassword,
  //       isVerified: true,
  //       verifyToken: token,
  //       verifyTokenExp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
  //     },
  //   });

  //   // const link = `https://yourapp.com/auth/verify?token=${token}`;

  //   return { email: owner.email, createdAt: owner.createdAt };
  // }

  // async verify(token: string) {
  //   const user = await this.prisma.projectOwner.findFirst({
  //     where: {
  //       verifyToken: token,
  //       verifyTokenExp: { gt: new Date() },
  //     },
  //   });

  //   if (!user) throw new BadRequestException('Invalid token');

  //   return this.prisma.projectOwner.update({
  //     where: { id: user.id },
  //     data: {
  //       isVerified: true,
  //       verifyToken: null,
  //       verifyTokenExp: null,
  //     },
  //   });
  // }
}

import { Injectable } from '@nestjs/common';
import { CreateProjectOwnerDto } from './dto/create-project-owner.dto';
import { UpdateProjectOwnerDto } from './dto/update-project-owner.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjectOwnerService {
  constructor(private prisma: PrismaService) {}

  create(createProjectOwnerDto: CreateProjectOwnerDto) {
    return this.prisma.projectOwner.create({
      data: createProjectOwnerDto,
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

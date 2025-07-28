import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects() {
    return this.prisma.project.findMany();
  }

  async create(data: CreateProjectDto) {
    return this.prisma.project.create({
      data: data,
    });
  }
}

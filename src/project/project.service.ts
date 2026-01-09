import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { fileNames } from 'src/proposal/proposal.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async getAllProjects() {
    return this.prisma.project.findMany();
  }

  async getProjectByID(id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id },
    });

    if (!project) return null;

    for (const fileName of fileNames) {
      if (project[fileName] && project[fileName]['key']) {
        // Replace S3 presigned URL with local file URL
        project[fileName]['presignedURL'] =
          `/files/${project[fileName]['key']}`;
      }
    }

    return project;
  }

  async create(data: CreateProjectDto) {
    return this.prisma.project.create({
      data: data,
    });
  }
}

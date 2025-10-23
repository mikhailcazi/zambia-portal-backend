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
      where: { id: id },
    });

    if (!project) return null;

    await Promise.all(
      fileNames.map(async (fileName) => {
        if (project[fileName] && project[fileName]['key']) {
          const key = project[fileName]['key'];
          const presignedURL = await this.s3Service.getPresignedUrl(key);
          project[fileName]['presignedURL'] = presignedURL;
        }
      }),
    );

    return project;
  }

  async create(data: CreateProjectDto) {
    return this.prisma.project.create({
      data: data,
    });
  }
}

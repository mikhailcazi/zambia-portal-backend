import { Module } from '@nestjs/common';
import { ProjectOwnerService } from './project-owner.service';
import { ProjectOwnerController } from './project-owner.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectOwnerController],
  providers: [ProjectOwnerService],
})
export class ProjectOwnerModule {}

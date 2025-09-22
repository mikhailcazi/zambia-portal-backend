import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ProposalModule } from './proposal/proposal.module';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    HealthModule,
    ProjectModule,
    PrismaModule,
    ProposalModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}

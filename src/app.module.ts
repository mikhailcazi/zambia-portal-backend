import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ProposalModule } from './proposal/proposal.module';
import { S3Module } from './s3/s3.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './admin/admin-users.module';
import { ProjectOwnerModule } from './project-owner/project-owner.module';

@Module({
  imports: [
    HealthModule,
    ProjectModule,
    PrismaModule,
    ProposalModule,
    S3Module,
    AuthModule,
    UsersModule,
    ProjectOwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}

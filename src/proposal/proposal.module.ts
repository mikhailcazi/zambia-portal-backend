import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';

@Module({
  imports: [PrismaModule],
  providers: [ProposalService],
  controllers: [ProposalController],
})
export class ProposalModule {}

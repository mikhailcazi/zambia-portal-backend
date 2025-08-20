import { PartialType } from '@nestjs/mapped-types';
import { CreateProposalDto } from './create-proposal.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { ProposalStatus } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateProposalDto extends PartialType(CreateProposalDto) {
  @IsOptional()
  @IsEnum(ProposalStatus)
  proposalstatus?: ProposalStatus;
}

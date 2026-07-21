import { ProposalStatus } from '@prisma/client';
import { IsOptional, IsEnum } from 'class-validator';

export class GetProposalsDto {
  @IsOptional()
  @IsEnum(ProposalStatus)
  status?: ProposalStatus;
}

import {
  IsString,
  IsEmail,
  IsBoolean,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ProposalStatus } from '@prisma/client';

export class CreateProposalDto {
  @IsString() projectName: string;
  @IsString() contactPerson: string;
  @IsString() location: string;
  @IsString() status: string;
  @IsString() siteName: string;

  @IsString() siteCapacity: string;
  @IsString() sitePhone: string;
  @IsEmail() siteEmail: string;
  @IsString() advisorName: string;
  @IsString() advisorPhone: string;
  @IsEmail() advisorEmail: string;
  @IsString() website: string;
  @IsString() partners: string;
  @IsString() description: string;
  @IsString() problems: string;
  @IsString() solution: string;
  @IsString() priorities: string;
  @IsString() outcomes: string;
  @IsString() challenges: string;
  @IsBoolean() biodiversityHotspot: boolean;
  @IsBoolean() protectedAreaExpansion: boolean;
  @IsBoolean() generatingRevenue: boolean;
  @IsString() communities: string;
  @IsString() smmes: string;
  @IsString() org: string;
  @IsString() scalable: string;
  @IsString() envImpact: string;
  @IsString() socialImpact: string;
  @IsString() sustainability: string;
  @IsString() profitability: string;
  @IsArray() funding: any;
  @IsArray() fundingOptions: string[];
  @IsArray() attachments: any;
  @IsOptional() @IsEnum(ProposalStatus) proposalstatus?: ProposalStatus;
}

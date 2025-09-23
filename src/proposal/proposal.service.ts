/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { Prisma, ProposalStatus } from '@prisma/client';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ProposalService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async getAllProposals() {
    return this.prisma.proposal.findMany();
  }

  async getProposalByID(id: string) {
    return this.prisma.proposal.findFirst({
      where: { id: id },
    });
  }

  async create(data: CreateProposalDto) {
    return this.prisma.proposal.create({
      data: data,
    });
  }

  // async approveProposal(proposalID: string) {
  //   const proposal = await this.prisma.proposal.findUnique({
  //     where: { id: proposalID },
  //   });

  //   if (!proposal) {
  //     throw new NotFoundException('Proposal not found');
  //   }

  //   const {
  //     proposalStatus,
  //     id,
  //     createdAt,
  //     updatedAt,
  //     comments,
  //     ...projectData
  //   } = proposal;

  //   // Create project using proposal fields
  //   const project = await this.prisma.project.create({
  //     data: {
  //       ...projectData,
  //       proposalId: proposal.id,
  //       projectOverview: proposal.projectOverview ?? [],
  //       categories: proposal.categories ?? [],
  //       envImpact: proposal.envImpact ?? [],
  //       socialImpact: proposal.socialImpact ?? [],
  //       compliance: proposal.compliance ?? {},
  //       fundingOptions: proposal.fundingOptions ?? {},
  //       fundingSought: proposal.fundingSought ?? [],
  //       companyRegistration: proposal.projectOverview ?? [],
  //       businessPlan: proposal.businessPlan ?? [],
  //       financialStatements: proposal.financialStatements ?? [],
  //       partnerships: proposal.partnerships ?? [],
  //       techStudies: proposal.techStudies ?? [],
  //       other: proposal.projectOverview ?? [],
  //     },
  //   });

  //   // Update proposal status
  //   await this.prisma.proposal.update({
  //     where: { id },
  //     data: { proposalStatus: ProposalStatus.APPROVED },
  //   });

  //   return project;
  // }

  async addComment(proposalId: string, comment: string) {
    // fetch the existing comments
    const proposal = await this.prisma.proposal.findUnique({
      where: { id: proposalId },
    });

    if (!proposal) throw new NotFoundException('Proposal not found');

    return this.prisma.proposal.update({
      where: { id: proposalId },
      data: {
        comments: [...((proposal.comments as string[]) ?? []), comment],
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `proposals/${Date.now()}-${file.originalname}`;
    const url = await this.s3Service.uploadFile(
      file.buffer,
      key,
      file.mimetype,
    );
    return {
      originalName: file.originalname,
      key,
      url,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}

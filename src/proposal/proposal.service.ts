import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { Prisma, ProposalStatus } from '@prisma/client';
import { S3Service } from 'src/s3/s3.service';

const fileNames = [
  'projectOverview',
  'companyRegistration',
  'businessPlan',
  'financialStatements',
  'partnerships',
  'techStudies',
  'other',
];

@Injectable()
export class ProposalService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async getAllProposals(filter: {
    showApproved: boolean;
    showRejected: boolean;
  }) {
    const statuses: ProposalStatus[] = ['PENDING'];

    if (filter.showApproved) statuses.push('APPROVED');
    if (filter.showRejected) statuses.push('REJECTED');
    return this.prisma.proposal.findMany({
      where: {
        proposalStatus: { in: statuses },
      },
    });
  }

  async getProposalByID(id: string) {
    const proposal = await this.prisma.proposal.findFirst({
      where: { id: id },
    });

    if (!proposal) return null;

    await Promise.all(
      fileNames.map(async (fileName) => {
        if (proposal[fileName] && proposal[fileName]['key']) {
          const key = proposal[fileName]['key'];
          const presignedURL = await this.s3Service.getPresignedUrl(key);
          proposal[fileName]['presignedURL'] = presignedURL;
        }
      }),
    );

    return proposal;
  }

  async create(data: CreateProposalDto) {
    return this.prisma.proposal.create({
      data: data,
    });
  }

  async approveProposal(proposalID: string, comment: string, user: string) {
    const proposal = await this.prisma.proposal.findUnique({
      where: { id: proposalID },
    });

    if (!proposal) {
      throw new NotFoundException('Proposal not found');
    }

    const {
      proposalStatus,
      id,
      createdAt,
      updatedAt,
      comments,
      ...projectData
    } = proposal;

    // Create project using proposal fields
    const project = await this.prisma.project.create({
      data: {
        ...projectData,
        proposalId: proposal.id,
        projectOverview: proposal.projectOverview ?? [],
        categories: proposal.categories ?? [],
        envImpact: proposal.envImpact ?? [],
        socialImpact: proposal.socialImpact ?? [],
        compliance: proposal.compliance ?? {},
        fundingOptions: proposal.fundingOptions ?? {},
        fundingSought: proposal.fundingSought ?? [],
        companyRegistration: proposal.projectOverview ?? [],
        businessPlan: proposal.businessPlan ?? [],
        financialStatements: proposal.financialStatements ?? [],
        partnerships: proposal.partnerships ?? [],
        techStudies: proposal.techStudies ?? [],
        other: proposal.projectOverview ?? [],
      },
    });

    const updateOps: any = { proposalStatus: ProposalStatus.APPROVED };

    if (comment && comment.trim() !== '') {
      const commentData = {
        comment,
        user,
        timeStamp: new Date(),
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateOps.comments = [
        ...((proposal.comments as string[]) ?? []),
        commentData,
      ];
    }

    // Update proposal status
    await this.prisma.proposal.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: updateOps,
    });

    return project;
  }

  async rejectProposal(proposalID: string, comment: string, user: string) {
    const proposal = await this.prisma.proposal.findUnique({
      where: { id: proposalID },
    });

    if (!proposal) {
      throw new NotFoundException('Proposal not found');
    }

    const updateOps: any = { proposalStatus: ProposalStatus.REJECTED };

    if (comment && comment.trim() !== '') {
      const commentData = {
        comment,
        user,
        timeStamp: new Date(),
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateOps.comments = [
        ...((proposal.comments as string[]) ?? []),
        commentData,
      ];
    }

    await this.prisma.proposal.update({
      where: { id: proposalID },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: updateOps,
    });

    return proposal;
  }

  async addComment(proposalId: string, comment: string, user: string) {
    // fetch the existing comments
    const proposal = await this.prisma.proposal.findUnique({
      where: { id: proposalId },
    });

    if (!proposal) throw new NotFoundException('Proposal not found');

    const commentData = {
      comment,
      user,
      timeStamp: new Date(),
    };

    return this.prisma.proposal.update({
      where: { id: proposalId },
      data: {
        comments: [...((proposal.comments as string[]) ?? []), commentData],
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

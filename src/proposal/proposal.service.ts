import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { Prisma, ProposalStatus } from '@prisma/client';
import { S3Service } from 'src/s3/s3.service';
import { promises as fs } from 'fs';
import { join, extname } from 'path';

const UPLOAD_ROOT = '/app/uploads';

export const fileNames = [
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
      where: { id },
    });

    if (!proposal) return null;

    for (const fileName of fileNames) {
      if (proposal[fileName] && proposal[fileName]['key']) {
        // replace S3 presigned URL with local file URL
        proposal[fileName]['presignedURL'] =
          `/files/${proposal[fileName]['key']}`;
      }
    }

    return proposal;
  }

  async getByUserId(userId: number) {
    const result = await this.prisma.proposal.findMany({
      where: {
        projectOwner: {
          userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('Result: ', result);
    return result;
    return this.prisma.proposal.findMany({
      where: {
        projectOwner: {
          userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(userId: number, data: CreateProposalDto) {
    const projectOwner = await this.prisma.projectOwner.findUnique({
      where: {
        userId,
      },
    });

    if (!projectOwner) {
      throw new NotFoundException('Project owner profile not found.');
    }

    return this.prisma.proposal.create({
      data: {
        ...data,
        projectOwner: {
          connect: {
            id: projectOwner.id,
          },
        },
      },
    });
  }

  async approveProposal(proposalID: string, comment: string, user: string) {
    return this.prisma.$transaction(async (tx) => {
      const proposal = await tx.proposal.findUnique({
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

      const updateOps: Prisma.ProposalUpdateInput = {
        proposalStatus: ProposalStatus.APPROVED,
      };

      if (comment?.trim()) {
        updateOps.comments = [
          ...((proposal.comments as any[]) ?? []),
          {
            comment,
            user,
            timeStamp: new Date(),
          },
        ];
      }

      const project = await tx.project.create({
        data: {
          ...projectData,
          proposalId: proposal.id,
          projectOwnerId: proposal.projectOwnerId,

          projectOverview: proposal.projectOverview ?? [],
          categories: proposal.categories ?? [],
          envImpact: proposal.envImpact ?? [],
          socialImpact: proposal.socialImpact ?? [],
          compliance: proposal.compliance ?? {},
          fundingOptions: proposal.fundingOptions ?? {},
          fundingSought: proposal.fundingSought ?? [],
          companyRegistration: proposal.companyRegistration ?? [],
          businessPlan: proposal.businessPlan ?? [],
          financialStatements: proposal.financialStatements ?? [],
          partnerships: proposal.partnerships ?? [],
          techStudies: proposal.techStudies ?? [],
          other: proposal.other ?? [],
        },
      });

      await tx.proposal.update({
        where: { id: proposal.id },
        data: updateOps,
      });

      return project;
    });
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
    const filename =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      extname(file.originalname);

    const key = `proposals/${filename}`;
    const filePath = join(UPLOAD_ROOT, 'proposals', filename);
    console.log('Upload folder:', join(UPLOAD_ROOT, 'proposals'));
    // ensure directory exists
    await fs.mkdir(join(UPLOAD_ROOT, 'proposals'), { recursive: true });

    // write file
    await fs.writeFile(filePath, file.buffer);

    const url = `/files/${key}`;

    return {
      originalName: file.originalname,
      key,
      url,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}

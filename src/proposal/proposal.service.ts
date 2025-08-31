import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { Prisma, ProposalStatus } from '@prisma/client';

@Injectable()
export class ProposalService {
  constructor(private prisma: PrismaService) {}

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

  async approveProposal(id: string) {
    const proposal = await this.prisma.proposal.findUnique({ where: { id } });

    if (!proposal) {
      throw new NotFoundException('Proposal not found');
    }

    // Create project using proposal fields
    const project = await this.prisma.project.create({
      data: {
        projectName: proposal.projectName,
        contactPerson: proposal.contactPerson,
        location: proposal.location,
        status: proposal.status,
        siteName: proposal.siteName,
        siteCapacity: proposal.siteCapacity,
        sitePhone: proposal.sitePhone,
        siteEmail: proposal.siteEmail,
        advisorName: proposal.advisorName,
        advisorPhone: proposal.advisorPhone,
        advisorEmail: proposal.advisorEmail,
        website: proposal.website,
        partners: proposal.partners,
        description: proposal.description,
        problems: proposal.problems,
        solution: proposal.solution,
        priorities: proposal.priorities,
        outcomes: proposal.outcomes,
        challenges: proposal.challenges,
        biodiversityHotspot: proposal.biodiversityHotspot,
        protectedAreaExpansion: proposal.protectedAreaExpansion,
        generatingRevenue: proposal.generatingRevenue,
        communities: proposal.communities,
        smmes: proposal.smmes,
        org: proposal.org,
        scalable: proposal.scalable,
        envImpact: proposal.envImpact,
        socialImpact: proposal.socialImpact,
        sustainability: proposal.sustainability,
        profitability: proposal.profitability,
        funding: proposal.funding as Prisma.InputJsonValue,
        fundingOptions: proposal.fundingOptions,
        attachments: proposal.attachments as Prisma.InputJsonValue,
        proposalId: proposal.id,
      },
    });

    // Update proposal status
    await this.prisma.proposal.update({
      where: { id },
      data: { proposalStatus: ProposalStatus.APPROVED },
    });

    return project;
  }

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
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';

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
}

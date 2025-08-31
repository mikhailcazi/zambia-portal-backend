import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get()
  getAll() {
    return this.proposalService.getAllProposals();
  }

  @Get(':id')
  getProposal(@Param('id') id: string) {
    return this.proposalService.getProposalByID(id);
  }

  @Post()
  create(@Body() createProposalDto: CreateProposalDto) {
    return this.proposalService.create(createProposalDto);
  }

  @Patch(':id/approve')
  approveProposal(@Param('id') id: string) {
    return this.proposalService.approveProposal(id);
  }

  @Post(':id/comments')
  addComment(@Param('id') id: string, @Body('comment') comment: string) {
    return this.proposalService.addComment(id, comment);
  }
}

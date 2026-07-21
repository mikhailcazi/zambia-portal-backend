import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtRequest } from 'src/users/users.types';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(
    @Query('approved') approved?: string,
    @Query('rejected') rejected?: string,
  ) {
    const showApproved = approved === 'true';
    const showRejected = rejected === 'true';

    const filters = { showApproved, showRejected };
    return this.proposalService.getAllProposals(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProposalsByUser(@Req() req: JwtRequest) {
    return this.proposalService.getByUserId(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProposal(@Param('id') id: string) {
    return this.proposalService.getProposalByID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'projectOverview', maxCount: 1 },
      { name: 'companyRegistration', maxCount: 1 },
      { name: 'businessPlan', maxCount: 1 },
      { name: 'financialStatements', maxCount: 1 },
      { name: 'partnerships', maxCount: 1 },
      { name: 'techStudies', maxCount: 1 },
      { name: 'other', maxCount: 5 },
    ]),
  )
  async create(
    @Req() req: JwtRequest,
    @UploadedFiles()
    files: {
      projectOverview?: Express.Multer.File[];
      companyRegistration?: Express.Multer.File[];
      businessPlan?: Express.Multer.File[];
      financialStatements?: Express.Multer.File[];
      partnerships?: Express.Multer.File[];
      techStudies?: Express.Multer.File[];
      other?: Express.Multer.File[];
    },
    @Body('data') dataStr: string,
  ) {
    try {
      const data = JSON.parse(dataStr) as CreateProposalDto;

      if (data.estimatedInvestment) {
        data.estimatedInvestment = Number(data.estimatedInvestment);
      }
      if (data.totalCost) {
        data.totalCost = Number(data.totalCost);
      }
      console.log('Parsed body:', data);
      console.log('Uploaded files:', files);

      for (const [field, file] of Object.entries(files)) {
        if (file && file[0]) {
          const key = await this.proposalService.uploadFile(file[0]);
          data[field] = key;
        }
      }

      return this.proposalService.create(req.user.sub, data);
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/approve')
  approveProposal(
    @Param('id') id: string,
    @Body('comment') comment: string,
    @Request() req,
  ) {
    const user = req.user;
    return this.proposalService.approveProposal(id, comment, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/reject')
  rejectProposal(
    @Param('id') id: string,
    @Body('comment') comment: string,
    @Request() req,
  ) {
    const user = req.user;
    return this.proposalService.rejectProposal(id, comment, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body('comment') comment: string,
    @Request() req,
  ) {
    const user = req.user;
    return this.proposalService.addComment(id, comment, user);
  }
}

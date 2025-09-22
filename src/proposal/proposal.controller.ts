import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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

      return this.proposalService.create(data);
    } catch (err) {
      console.log(err);
    }
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

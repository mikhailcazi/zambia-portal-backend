import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectOwnerService } from './project-owner.service';
import { CreateProjectOwnerDto } from './dto/create-project-owner.dto';
import { UpdateProjectOwnerDto } from './dto/update-project-owner.dto';

@Controller('project-owner')
export class ProjectOwnerController {
  constructor(private readonly projectOwnerService: ProjectOwnerService) {}

  @Post('register')
  register(@Body() createProjectOwnerDto: CreateProjectOwnerDto) {
    return this.projectOwnerService.create(createProjectOwnerDto);
  }

  @Post('verify')
  verify(@Body('token') token: string) {
    return this.projectOwnerService.verify(token);
  }

  @Get()
  findAll() {
    return this.projectOwnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectOwnerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectOwnerDto: UpdateProjectOwnerDto,
  ) {
    return this.projectOwnerService.update(+id, updateProjectOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectOwnerService.remove(+id);
  }
}

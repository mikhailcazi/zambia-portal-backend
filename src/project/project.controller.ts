import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtRequest } from 'src/users/users.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll() {
    return this.projectService.getAllProjects();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProjectsByUser(@Req() req: JwtRequest) {
    return this.projectService.getByUserId(req.user.sub);
  }

  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectService.getProjectByID(id);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    await this.projectService
      .getProjectByID(id)
      .then((project) => console.log(project));
    return this.projectService.getProjectByID(id);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
}

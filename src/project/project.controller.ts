import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll() {
    return this.projectService.getAllProjects();
  }

  @Post()
  create(@Body() body: { title: string; status: string }) {
    return this.projectService.createProject(body.title, body.status);
  }
}

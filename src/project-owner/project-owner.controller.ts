import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectOwnerService } from './project-owner.service';
import { UpdateProjectOwnerDto } from './dto/update-project-owner.dto';

@Controller('user')
export class ProjectOwnerController {
  constructor(private readonly projectOwnerService: ProjectOwnerService) {}

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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectOwnerService.remove(+id);
  // }

  // @Post('register')
  // register(@Body() createProjectOwnerDto: CreateProjectOwnerDto) {
  //   return this.projectOwnerService.create(createProjectOwnerDto);
  // }

  // @Post('verify')
  // verify(@Body('token') token: string) {
  //   return this.projectOwnerService.verify(token);
  // }
}

import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectOwnerService } from './project-owner.service';
import { UpdateProjectOwnerDto } from './dto/update-project-owner.dto';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtRequest } from 'src/users/users.types';

@Controller('project-owner')
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

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  update(
    @Req() req: JwtRequest,
    @Body() updateProjectOwnerDto: UpdateProjectOwnerDto,
  ) {
    console.log(req.user, updateProjectOwnerDto);
    return this.projectOwnerService.update(req.user.sub, updateProjectOwnerDto);
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

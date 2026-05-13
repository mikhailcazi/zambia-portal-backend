import { PartialType } from '@nestjs/swagger';
import { CreateProjectOwnerDto } from './create-project-owner.dto';

export class UpdateProjectOwnerDto extends PartialType(CreateProjectOwnerDto) {}

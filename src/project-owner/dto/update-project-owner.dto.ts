import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectOwnerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  organization?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  position?: string;
}

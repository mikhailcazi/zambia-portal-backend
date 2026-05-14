import { IsString, IsOptional } from 'class-validator';

export class CreateProjectOwnerDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  name!: string;

  @IsString()
  organization!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  position?: string;
}

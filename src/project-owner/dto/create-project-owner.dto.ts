import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateProjectOwnerDto {
  @IsEmail()
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

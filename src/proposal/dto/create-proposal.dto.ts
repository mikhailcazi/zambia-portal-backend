import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateProposalDto {
  @IsString() @IsNotEmpty() projectTitle!: string;
  @IsString() @IsNotEmpty() organization!: string;
  @IsString() @IsNotEmpty() contactPerson!: string;
  @IsString() @IsNotEmpty() location!: string;
  @IsString() @IsNotEmpty() sector!: string;

  @IsDateString() startDate!: string;
  @IsDateString() endDate!: string;

  @IsString() @IsNotEmpty() stage!: string;

  @IsNumber() estimatedInvestment!: number;
  @IsString() @IsNotEmpty() currency!: string;
  @IsString() @IsNotEmpty() partners!: string;

  @IsArray() projectOverview!: object[];

  @IsArray() categories!: string[];
  @IsString() categoriesOther!: string;

  @IsArray() envImpact!: string[];
  @IsString() @IsNotEmpty() envImpactIndicator!: string;
  @IsString() @IsNotEmpty() envImpactDescription!: string;

  @IsArray() socialImpact!: string[];
  @IsString() socialImpactDescription!: string;

  @IsNotEmpty()
  compliance!: Record<string, string>;

  @IsNotEmpty()
  fundingOptions!: Record<string, string>;
  @IsString() fundingOptionsOther!: string;

  @IsNumber()
  totalCost!: number;
  @IsArray() fundingSought!: string[];

  @IsString() @IsNotEmpty() scalable!: string;
  @IsBoolean() measureableImpact!: boolean;
  @IsBoolean() annualReporting!: boolean;
  @IsBoolean() keyIndicators!: boolean;
  @IsBoolean() monitoring!: boolean;

  @IsArray() companyRegistration!: object[];
  @IsArray() businessPlan!: object[];
  @IsArray() financialStatements!: object[];
  @IsArray() partnerships!: object[];
  @IsArray() techStudies!: object[];
  @IsArray() other!: object[];

  @IsString() @IsNotEmpty() signedName!: string;
  @IsString() @IsNotEmpty() position!: string;
}

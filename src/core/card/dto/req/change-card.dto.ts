import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export default class ReqChangeCardDto {
  @IsOptional()
  @IsString()
  public readonly title?: string;

  @IsOptional()
  @IsDateString()
  public readonly dateFrom?: Date;

  @IsOptional()
  @IsDateString()
  public readonly dateTo?: Date;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  public readonly count?: number;
}

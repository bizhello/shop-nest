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
  @IsDateString({}, { each: true })
  public readonly dateFrom?: Date;

  @IsOptional()
  @IsDateString({}, { each: true })
  public readonly dateTo?: Date;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  public readonly count?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export default class ReqChangeCardDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  public readonly title?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString({}, { each: true })
  public readonly dateFrom?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString({}, { each: true })
  public readonly dateTo?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  public readonly count?: number;
}

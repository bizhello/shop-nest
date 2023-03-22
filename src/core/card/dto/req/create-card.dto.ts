import { ICard } from '@app/core/card/interfaces/ICard';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export default class ReqCreateCardDto implements ICard {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({}, { each: true })
  public readonly dateFrom: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({}, { each: true })
  public readonly dateTo: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  public readonly count: number;
}

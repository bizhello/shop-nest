import { ICard } from '@app/core/card/interfaces/ICard';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export default class ReqCreateCardDto implements ICard {
  @IsNotEmpty()
  @IsString()
  public readonly title: string;

  @IsNotEmpty()
  @IsDateString({}, { each: true })
  public readonly dateFrom: Date;

  @IsNotEmpty()
  @IsDateString({}, { each: true })
  public readonly dateTo: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  public readonly count: number;
}

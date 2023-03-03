import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

import { ICard } from '../../interfaces/ICard';

export default class ReqCreateCardDto implements ICard {
  @IsNotEmpty()
  @IsString()
  public readonly title: string;

  @IsNotEmpty()
  @IsDateString()
  public readonly dateFrom: Date;

  @IsNotEmpty()
  @IsDateString()
  public readonly dateTo: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  public readonly count: number;
}

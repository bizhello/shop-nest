import { ICardWithId } from '@app/core/card/interfaces/ICard';
import { Types } from 'mongoose';

export default class ResCardDto implements ICardWithId {
  public readonly id: Types.ObjectId;

  public readonly title: string;

  public readonly dateFrom: Date;

  public readonly dateTo: Date;

  public readonly count: number;
}

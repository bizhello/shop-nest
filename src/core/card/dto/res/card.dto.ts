import { Types } from 'mongoose';

import { ICardWithId } from '../../interfaces/ICard';

export default class ResCardDto implements ICardWithId {
  public readonly id: Types.ObjectId;

  public readonly title: string;

  public readonly dateFrom: Date;

  public readonly dateTo: Date;

  public readonly count: number;
}

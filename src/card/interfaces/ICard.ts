import { Types } from 'mongoose';

export interface ICard {
  readonly title: string;
  readonly dateFrom: Date;
  readonly dateTo: Date;
  readonly count: number;
}

export interface ICardWithId extends ICard {
  readonly id: Types.ObjectId;
}

export interface IChangeCard {
  readonly title?: string;
  readonly dateFrom?: Date;
  readonly dateTo?: Date;
  readonly count?: number;
}

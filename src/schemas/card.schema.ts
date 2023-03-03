import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true, unique: true })
  public title: string;

  @Prop({
    required: true,
  })
  public dateFrom: Date;

  @Prop({
    required: true,
  })
  public dateTo: Date;

  @Prop({
    required: true,
  })
  public count: number;
}
export type TCardDocument = HydratedDocument<Card>;
export const cardSchema = SchemaFactory.createForClass(Card);

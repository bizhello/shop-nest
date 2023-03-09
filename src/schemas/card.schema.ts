import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true, unique: true, type: String })
  public title: string;

  @Prop({
    required: true,
    type: Date,
  })
  public dateFrom: Date;

  @Prop({
    required: true,
    type: Date,
  })
  public dateTo: Date;

  @Prop({
    required: true,
    type: Number,
    min: 1,
  })
  public count: number;
}
export type TCardDocument = HydratedDocument<Card>;
export const cardSchema = SchemaFactory.createForClass(Card);

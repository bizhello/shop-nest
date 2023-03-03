import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import UserEnum from '../common/enums/user';

@Schema()
export default class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserEnum.USER })
  public userId: string;

  @Prop({
    required: true,
  })
  public refreshToken: string;
}

export type TTokenDocument = HydratedDocument<Token>;
export const tokenSchema = SchemaFactory.createForClass(Token);

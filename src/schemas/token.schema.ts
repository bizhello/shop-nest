import { TextEnum } from '@app/common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TextEnum.USER })
  public userId: string;

  @Prop({
    required: true,
  })
  public refreshToken: string;
}

export type TTokenDocument = HydratedDocument<Token>;
export const tokenSchema = SchemaFactory.createForClass(Token);

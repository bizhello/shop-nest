import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { maxLength } from '../common/constans/maxLengthUser';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({
    required: true,
    minLength: 4,
    select: false,
  })
  public password: string;

  @Prop({
    required: true,
    minLength: 2,
    maxLength,
  })
  public firstName: string;

  @Prop({
    required: true,
    minLength: 2,
    maxLength,
  })
  public lastName: string;
}

export type TUserDocument = HydratedDocument<User>;
export const userSchema = SchemaFactory.createForClass(User);

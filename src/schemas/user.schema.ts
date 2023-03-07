import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({
    required: true,
    select: false,
  })
  public password: string;

  @Prop({
    required: true,
  })
  public firstName: string;

  @Prop({
    required: true,
  })
  public lastName: string;
}

export type TUserDocument = HydratedDocument<User>;
export const userSchema = SchemaFactory.createForClass(User);

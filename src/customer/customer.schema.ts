import { Field, ID, ObjectType } from '@nestjs/graphql';
import mongoose, { Document } from 'mongoose';

@ObjectType()
export class Customer extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;
}

export const CustomerSchema = new mongoose.Schema({ name: String });

import { Field, ID, ObjectType } from '@nestjs/graphql';
import mongoose, { Document } from 'mongoose';

@ObjectType()
export class Item extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;
}

export const ItemSchema = new mongoose.Schema({ name: String });

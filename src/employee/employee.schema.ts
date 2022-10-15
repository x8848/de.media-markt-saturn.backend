import { Field, ID, ObjectType } from '@nestjs/graphql';
import mongoose, { Document } from 'mongoose';

@ObjectType()
export class Employee extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;
}

export const EmployeeSchema = new mongoose.Schema({ name: String });

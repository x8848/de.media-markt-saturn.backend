import { Field, ID, ObjectType } from '@nestjs/graphql';
import mongoose, { Document } from 'mongoose';
import { OrderStatus } from 'src/utils/enums';
import { Customer } from '../customer/customer.schema';
import { Employee } from '../employee/employee.schema';
import { Item } from '../item/item.schema';

@ObjectType()
export class Order extends Document {
  @Field(() => ID)
  _id: string;

  @Field((type) => OrderStatus)
  status: OrderStatus;

  @Field()
  customer: Customer;

  @Field({ nullable: true })
  employee?: Employee;

  @Field((type) => [Item])
  items: Item[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const OrderSchema = new mongoose.Schema(
  {
    status: { type: String, enum: Object.values(OrderStatus) },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: Customer.name },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: Employee.name },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: Item.name }],
  },
  { timestamps: true },
);

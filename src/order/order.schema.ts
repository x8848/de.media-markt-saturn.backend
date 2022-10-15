import { Field, ID, ObjectType } from '@nestjs/graphql';
import mongoose, { Document } from 'mongoose';
import { OrderStatus } from 'src/utils/enums';
import { Customer } from '../customer/customer.schema';
import { Employee } from '../employee/employee.schema';
import { Item } from '../item/item.schema';
import { OrderHistory } from './orderHistory.schema';

@ObjectType()
export class Order extends Document {
  @Field(() => ID)
  _id: string;

  @Field((type) => OrderStatus)
  status: OrderStatus;

  @Field((type) => Customer)
  customer: Customer;

  @Field((type) => Employee, { nullable: true })
  employee?: Employee;

  @Field((type) => [Item])
  items: Item[];

  @Field((type) => [OrderHistory])
  history: OrderHistory[];

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
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: OrderHistory.name }],
  },
  { timestamps: true },
);

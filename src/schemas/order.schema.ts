import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderStatus } from 'src/utils/enums';
import { Customer } from './customer.schema';
import { Employee } from './employee.schema';
import { Item } from './item.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ enum: OrderStatus, required: true })
  status: OrderStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employee: Employee;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }])
  items: Item[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

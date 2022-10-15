import { Field, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { OrderStatus } from 'src/utils/enums';

@ObjectType()
export class OrderHistory {
  @Field((type) => OrderStatus)
  status: OrderStatus;

  @Field()
  updatedAt: Date;
}

export const OrderHistorySchema = new mongoose.Schema(
  {
    status: { type: String, enum: Object.values(OrderStatus) },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
    collection: 'ordersHistory',
  },
);

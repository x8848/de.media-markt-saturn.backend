import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';
import { OrderHistory, OrderHistorySchema } from './orderHistory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderHistory.name, schema: OrderHistorySchema },
    ]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}

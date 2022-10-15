import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}

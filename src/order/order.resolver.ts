import { Args, Query, Resolver } from '@nestjs/graphql';
import { Order } from './order.schema';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private ordersService: OrderService) {}

  @Query((returns) => Order)
  async order(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Query((returns) => [Order])
  async orders() {
    return this.ordersService.findAll();
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderStatus } from 'src/utils/enums';
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

  @Mutation((returns) => Order)
  async updateOrderStatus(
    @Args('id') id: string,
    @Args('status') status: OrderStatus,
  ) {
    return this.ordersService.updateStatus(id, status);
  }
}

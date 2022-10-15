import { NotAcceptableException } from '@nestjs/common';
import { Order } from 'src/order/order.schema';
import { OrderStatus } from './enums';

export const checkOrderStatus = (order: Order, status: OrderStatus) => {
  if (order.status === OrderStatus.OPEN && status === OrderStatus.IN_PROGRESS)
    return;
  if (
    order.status === OrderStatus.IN_PROGRESS &&
    status === OrderStatus.COMPLETE
  )
    return;
  throw new NotAcceptableException(); // NOTE: order status can't be reverted
};

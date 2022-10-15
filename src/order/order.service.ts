import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/order/order.schema';
import { OrderStatus } from 'src/utils/enums';
import { checkOrderStatus } from 'src/utils/order';
import { OrderHistory } from './orderHistory.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderHistory.name)
    private orderHistoryModel: Model<OrderHistory>,
  ) {}

  async findOne(id: string) {
    const order = await this.orderModel
      .findOne({ _id: id })
      .populate(['customer', 'employee', 'items', 'history']);

    if (!order) throw new NotFoundException();

    return order;
  }

  async findAll() {
    return await this.orderModel
      .find()
      .populate(['customer', 'employee', 'items', 'history']);
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.findOne(id);

    checkOrderStatus(order, status);

    const historyRecord = await this.orderHistoryModel.create({ status });

    const history = order.history.concat(historyRecord);

    return await this.orderModel
      .findByIdAndUpdate(id, { status, history }, { new: true })
      .populate(['customer', 'employee', 'items', 'history']);
  }
}

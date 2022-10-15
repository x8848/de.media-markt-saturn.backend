import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/order/order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ _id: id }).exec();
    return order;
  }

  async findAll() {
    return this.orderModel.find().exec();
  }
}

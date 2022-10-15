import mongoose from 'mongoose';
import { Customer, CustomerSchema } from 'src/customer/customer.schema';
import { Employee, EmployeeSchema } from 'src/employee/employee.schema';
import { Item, ItemSchema } from 'src/item/item.schema';
import { Order, OrderSchema } from 'src/order/order.schema';
import {
  OrderHistory,
  OrderHistorySchema,
} from 'src/order/orderHistory.schema';
import { MONGODB_URL } from './constants';
import { OrderStatus } from './enums';

const customerModel = mongoose.model(Customer.name, CustomerSchema);
const employeeModel = mongoose.model(Employee.name, EmployeeSchema);
const itemModel = mongoose.model(Item.name, ItemSchema);
const orderModel = mongoose.model(Order.name, OrderSchema);
const orderHistoryModel = mongoose.model(OrderHistory.name, OrderHistorySchema);

const seed = async () => {
  await mongoose.connect(MONGODB_URL);

  await customerModel.deleteMany({});
  await employeeModel.deleteMany({});
  await itemModel.deleteMany({});
  await orderModel.deleteMany({});

  const customer = await customerModel.create({ name: 'customer' });
  const employee = await employeeModel.create({ name: 'employee' });
  const item1 = await itemModel.create({ name: 'item1' });
  const item2 = await itemModel.create({ name: 'item2' });
  const item3 = await itemModel.create({ name: 'item3' });

  const open = await orderHistoryModel.create({ status: OrderStatus.OPEN });
  const inProgress = await orderHistoryModel.create({
    status: OrderStatus.IN_PROGRESS,
  });
  const complete = await orderHistoryModel.create({
    status: OrderStatus.COMPLETE,
  });

  await orderModel.create({
    status: OrderStatus.OPEN,
    customer: customer,
    employee: employee,
    items: [item1],
    history: [open],
  });

  await orderModel.create({
    status: OrderStatus.IN_PROGRESS,
    customer: customer,
    employee: employee,
    items: [item2],
    history: [open, inProgress],
  });

  await orderModel.create({
    status: OrderStatus.COMPLETE,
    customer: customer,
    employee: employee,
    items: [item3],
    history: [open, inProgress, complete],
  });

  await mongoose.connection.close();
};

try {
  seed();
} catch (error) {
  console.log('Seed Error: \n', error);
}

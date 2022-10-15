import mongoose from 'mongoose';
import { CustomerSchema } from 'src/customer/customer.schema';
import { EmployeeSchema } from 'src/employee/employee.schema';
import { ItemSchema } from 'src/item/item.schema';
import { OrderSchema } from 'src/order/order.schema';
import { MONGODB_URL } from './constants';
import { OrderStatus } from './enums';

const Customer = mongoose.model('Customer', CustomerSchema);
const Employee = mongoose.model('Employee', EmployeeSchema);
const Item = mongoose.model('Item', ItemSchema);
const Order = mongoose.model('Order', OrderSchema);

const seed = async () => {
  await mongoose.connect(MONGODB_URL);

  await Customer.deleteMany({});
  await Employee.deleteMany({});
  await Item.deleteMany({});
  await Order.deleteMany({});

  const customer = await Customer.create({ name: 'Customer' });
  const employee = await Employee.create({ name: 'Employee' });
  const item1 = await Item.create({ name: 'Item1' });
  const item2 = await Item.create({ name: 'Item2' });
  const item3 = await Item.create({ name: 'Item3' });

  await Order.create({
    status: OrderStatus.OPEN,
    customer: customer,
    employee: undefined,
    items: [item1],
  });

  await Order.create({
    status: OrderStatus.IN_PROGRESS,
    customer: customer,
    employee: employee,
    items: [item2],
  });

  await Order.create({
    status: OrderStatus.COMPLETE,
    customer: customer,
    employee: employee,
    items: [item3],
  });

  await mongoose.connection.close();
};

try {
  seed();
} catch (error) {
  console.log('Seed Error: \n', error);
}

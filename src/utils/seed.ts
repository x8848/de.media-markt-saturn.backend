import mongoose from 'mongoose';
import { CustomerSchema } from 'src/schemas/customer.schema';
import { EmployeeSchema } from 'src/schemas/employee.schema';
import { ItemSchema } from 'src/schemas/item.schema';
import { OrderSchema } from 'src/schemas/order.schema';
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

  await Employee.create({ name: 'Employee1' });
  await Employee.create({ name: 'Employee2' });

  const customer = await Customer.create({ name: 'Customer' });
  const item1 = await Item.create({ name: 'Item1', price: 100 });
  const item2 = await Item.create({ name: 'Item2', price: 200 });

  await Order.create({
    status: OrderStatus.Open,
    customer: customer,
    items: [item1, item2],
  });

  await mongoose.connection.close();
};

try {
  seed();
} catch (error) {
  console.log('Seed Error: \n', error);
}

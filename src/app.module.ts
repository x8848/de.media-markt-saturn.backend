import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { ItemModule } from './item/item.module';
import { OrdersModule } from './order/order.module';
import { MONGODB_URL } from './utils/constants';

@Module({
  imports: [
    CustomerModule,
    EmployeeModule,
    ItemModule,
    OrdersModule,
    MongooseModule.forRoot(MONGODB_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      debug: false,
      playground: true,
      // resolvers: { JSON: GraphQLJSON },
    }),
  ],
})
export class AppModule {}

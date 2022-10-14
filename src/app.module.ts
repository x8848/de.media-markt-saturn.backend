import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { MONGODB_URL } from './utils/constants';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL), OrdersModule],
})
export class AppModule {}

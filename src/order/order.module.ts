import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './entities/order.entity';
import { MockOrderService } from './integration/mock/mock-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), HttpModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'OrderIntegrationAdapter',
      useClass: MockOrderService,
    },
  ],
})
export class OrderModule {}

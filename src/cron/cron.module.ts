import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncOrdersService } from './order/sync-orders.service';
import { OrderModule } from '../order/order.module';
import { OrderEntity } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import { MockOrderService } from '../order/integration/mock/mock-order.service';

@Module({
  imports: [OrderModule, HttpModule, TypeOrmModule.forFeature([OrderEntity])],
  providers: [
    SyncOrdersService,
    OrderService,
    {
      provide: 'OrderIntegrationAdapter',
      useClass: MockOrderService,
    },
  ],
})
export class CronModule {}

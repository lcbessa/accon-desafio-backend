import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../../order/order.service';
import { MockOrderService } from '../../order/integration/mock/mock-order.service';

@Injectable()
export class SyncOrdersService {
  private readonly logger = new Logger(SyncOrdersService.name);

  constructor(
    private readonly orderService: OrderService,
    @Inject('OrderIntegrationAdapter')
    private readonly integrationService: MockOrderService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleOrderSync() {
    this.logger.log('Iniciando a sincronização de pedidos...');
    const orders = await this.integrationService.fetchOrders();
    if (!orders || orders.length === 0) {
      this.logger.log('Nenhum pedido encontrado para sincronizar.');
      return;
    }
    this.logger.log(`Sincronizando ${orders.length} pedidos...`);
    await this.orderService.createMany(orders);
    this.logger.log(`Pedidos sincronizados com sucesso`);
  }
}

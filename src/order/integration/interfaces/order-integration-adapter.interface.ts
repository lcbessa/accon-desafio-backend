import { RequestOrderDTO } from '../../dto/request-order.dto';

export interface IOrderIntegrationAdapter {
  fetchOrders(): Promise<RequestOrderDTO[]>;
}

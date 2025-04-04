import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { IOrderIntegrationAdapter } from '../interfaces/order-integration-adapter.interface';
import { RequestOrderDTO } from '../../dto/request-order.dto';
import { MockOrderMapper, MockOrderRawData } from './mock-order-mapper';

// mock local
const EXTERNAL_ORDERS_API_URL =
  'http://192.168.1.11:8080/delivery-mock-data.json';

@Injectable()
export class MockOrderService implements IOrderIntegrationAdapter {
  constructor(private readonly httpService: HttpService) {}

  async fetchOrders(): Promise<RequestOrderDTO[]> {
    const response = await lastValueFrom(
      this.httpService.get<MockOrderRawData>(EXTERNAL_ORDERS_API_URL),
    );

    const data = response.data;

    // Caso os dados da api sejam uma lista de pedidos
    // return data.map(MockOrderMapper.toRequestOrderDTO);

    return [MockOrderMapper.toRequestOrderDTO(data)];
  }
}

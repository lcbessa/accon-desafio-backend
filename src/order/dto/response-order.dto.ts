import { OrderEntity } from '../entities/order.entity';

export class ResponseOrderDTO {
  id: number;
  externalId: string;
  orderDate: string;
  customerName: string;
  total: number;
  items: {
    name: string;
    quantity: number;
    total: number;
  }[];

  constructor(user: OrderEntity) {
    this.id = user.id;
    this.externalId = user.externalId;
    this.orderDate = user.orderDate;
    this.customerName = user.customerName;
    this.total = user.total;
    this.items = user.items;
  }
}

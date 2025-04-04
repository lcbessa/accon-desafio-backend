import { RequestOrderDTO } from '../../dto/request-order.dto';

export interface MockOrderRawData {
  _id: string;
  date: string;
  total: number;
  user?: {
    name?: string;
  };
  products: {
    name: string;
    quantity: number;
    total: number;
  }[];
}

export class MockOrderMapper {
  static toRequestOrderDTO(raw: MockOrderRawData): RequestOrderDTO {
    return {
      externalId: raw._id,
      orderDate: raw.date,
      customerName: raw.user?.name ?? 'Cliente',
      total: raw.total,
      items: raw.products.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        total: product.total,
      })),
    };
  }
}

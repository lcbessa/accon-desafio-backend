import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestOrderDTO } from './dto/request-order.dto';
import { ResponseOrderDTO } from './dto/response-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) {}

  async create(requestOrderDTO: RequestOrderDTO) {
    const newOrder = this.ordersRepository.create(requestOrderDTO);

    return await this.ordersRepository.save(newOrder);
  }

  async createMany(requestOrderDTOs: RequestOrderDTO[]) {
    const newOrders = this.ordersRepository.create(requestOrderDTOs);
    return await this.ordersRepository.save(newOrders);
  }

  async findAll() {
    return await this.ordersRepository.find();
  }

  async findOne(id: number) {
    return await this.ordersRepository.findOne({ where: { id } });
  }

  async update(id: number, responseOrderDTO: ResponseOrderDTO) {
    return await this.ordersRepository.update(id, responseOrderDTO);
  }

  async remove(id: number) {
    return await this.ordersRepository.delete(id);
  }
}

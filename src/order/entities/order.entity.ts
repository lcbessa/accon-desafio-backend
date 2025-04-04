import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string;

  @Column()
  orderDate: string;

  @Column()
  customerName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column('jsonb')
  items: {
    name: string;
    quantity: number;
    total: number;
  }[];
}

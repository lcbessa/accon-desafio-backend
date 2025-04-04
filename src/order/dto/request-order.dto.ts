import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsArray,
} from 'class-validator';

export class RequestOrderDTO {
  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  orderDate: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  customerName: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsArray()
  items: {
    name: string;
    quantity: number;
    total: number;
  }[];
}

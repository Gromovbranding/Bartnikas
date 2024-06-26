import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export enum PaymentType {
  Stripe = 'stripe',
  Robokassa = 'robokassa',
}

export class OrderPhotoportalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsEnum(PaymentType)
  @IsNotEmpty()
  type: PaymentType;
}

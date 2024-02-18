import {
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderByPaymentDto {
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(1)
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO4217CurrencyCode()
  currency: string;
}

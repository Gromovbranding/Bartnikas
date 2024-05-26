import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatuses } from 'src/shared/enum/payment-statuses.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PhotoportalOrder {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  uuid: string;

  @ApiProperty()
  @Column()
  amount: string;

  @ApiProperty()
  @Column()
  currency: string;

  @ApiProperty()
  @Column()
  invoice_id: string;

  @ApiProperty()
  @Column({ default: '0' })
  actually_paid: string;

  @ApiProperty()
  @Column({ enum: PaymentStatuses, default: PaymentStatuses.Created })
  status: PaymentStatuses;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

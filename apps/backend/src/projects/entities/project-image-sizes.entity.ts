import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UnitSize {
  cm = 'cm',
}

@Entity()
export class ProjectImageSizes {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  width: number;

  @ApiProperty()
  @Column()
  height: number;

  @ApiProperty()
  @Column({
    default: 1,
  })
  quantity: number;

  @ApiProperty({ enum: UnitSize, default: UnitSize.cm })
  @Column({
    type: 'enum',
    enum: UnitSize,
    default: UnitSize.cm,
  })
  unit: UnitSize;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

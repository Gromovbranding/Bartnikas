import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServicesTranslate } from './services-translate.entity';

@Entity()
export class Services {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({ type: () => [ServicesTranslate] })
  @OneToMany(() => ServicesTranslate, (item) => item.services_translate, {
    cascade: true,
    eager: true,
  })
  translate: ServicesTranslate[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

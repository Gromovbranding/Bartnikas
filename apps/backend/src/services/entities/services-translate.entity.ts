import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Language } from '../../shared/language/entities/language.entity';
import { Services } from './services.entity';

@Entity()
export class ServicesTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Services, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  services_translate: Services;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty()
  @Column({ array: false, type: 'jsonb', default: () => "'[]'" })
  services: {
    title: string;
    text: string;
    btn: { text: string; url: string };
  }[];

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.services_translate, {
    eager: true,
  })
  language: Language;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

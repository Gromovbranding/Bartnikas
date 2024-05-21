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
import { About } from './about.entity';

@Entity()
export class AboutTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => About, (about) => about.translate, {
    onDelete: 'CASCADE',
  })
  about: About;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  subtitle: string;

  @ApiProperty()
  @Column({ array: false, type: 'jsonb' })
  advantages: { value: string; text: string }[];

  @ApiProperty()
  @Column()
  concept_title: string;

  @ApiProperty()
  @Column()
  concept_text: string;

  @ApiProperty()
  @Column()
  ticker_title: string;

  @ApiProperty()
  @Column()
  ticker_text: string;

  @ApiProperty()
  @Column()
  recognition_title: string;

  @ApiProperty()
  @Column()
  recognition_text: string;

  @ApiProperty()
  @Column({ array: false, type: 'jsonb', default: () => "'[]'" })
  recognition_cities: { name: string }[];

  @ApiProperty()
  @Column({ array: false, type: 'jsonb' })
  achievements: { text: string }[];

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.about_translate, {
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

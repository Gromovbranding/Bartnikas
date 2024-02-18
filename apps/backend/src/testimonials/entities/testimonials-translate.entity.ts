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
import { Testimonials } from './testimonials.entity';

@Entity()
export class TestimonialsTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Testimonials, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  testimonial: Testimonials;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  additional_info: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.testimonials_translate, {
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

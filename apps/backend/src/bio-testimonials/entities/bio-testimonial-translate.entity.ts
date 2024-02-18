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
import { BioTestimonial } from './bio-testimonial.entity';

@Entity()
export class BioTestimonialTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => BioTestimonial, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  bio_testimonial: BioTestimonial;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  job: string;

  @ApiProperty()
  @Column({ type: 'text' })
  testimonial: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.bio_testimonial_translate, {
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

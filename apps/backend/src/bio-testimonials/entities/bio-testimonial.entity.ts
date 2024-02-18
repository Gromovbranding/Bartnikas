import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../files/entities/file.entity';
import { BioTestimonialTranslate } from './bio-testimonial-translate.entity';

@Entity()
export class BioTestimonial {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [BioTestimonialTranslate] })
  @OneToMany(() => BioTestimonialTranslate, (item) => item.bio_testimonial, {
    cascade: true,
    eager: true,
  })
  translate: BioTestimonialTranslate[];

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  photo: File;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

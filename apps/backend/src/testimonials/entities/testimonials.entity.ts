import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { TestimonialsTranslate } from './testimonials-translate.entity';

@Entity()
export class Testimonials {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [TestimonialsTranslate] })
  @OneToMany(() => TestimonialsTranslate, (item) => item.testimonial, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  translate: TestimonialsTranslate[];

  @ApiProperty({
    nullable: true,
    default: null,
  })
  @Column({
    nullable: true,
    default: null,
  })
  url: string;

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  file: File;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

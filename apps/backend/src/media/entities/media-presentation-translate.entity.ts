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
import { MediaPresentation } from './media-presentation.entity';

@Entity()
export class MediaPresentationTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => MediaPresentation, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  mediaPresentation: MediaPresentation;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.media_presentation_translate, {
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

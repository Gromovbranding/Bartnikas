import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaExhibition } from './media-exhibition.entity';
import { Language } from '../../shared/language/entities/language.entity';

@Entity()
export class MediaExhibitionTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => MediaExhibition, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  mediaExhibition: MediaExhibition;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  awards: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.media_exhibition_translate, {
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

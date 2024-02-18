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
import { MediaPublication } from './media-publication.entity';

@Entity()
export class MediaPublicationTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => MediaPublication, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  mediaPublication: MediaPublication;

  @ApiProperty()
  @Column({ type: 'text' })
  program: string;

  @ApiProperty()
  @Column({ type: 'text' })
  subtitle: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.media_publication_translate, {
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

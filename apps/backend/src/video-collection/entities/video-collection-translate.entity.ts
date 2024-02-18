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
import { VideoCollection } from './video-collection.entity';

@Entity()
export class VideoCollectionTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => VideoCollection, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  video_collection: VideoCollection;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.video_collection_translate, {
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

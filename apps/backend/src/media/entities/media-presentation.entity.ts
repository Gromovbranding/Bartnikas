import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../files/entities/file.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaPresentationTranslate } from './media-presentation-translate.entity';

@Entity()
export class MediaPresentation {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [MediaPresentationTranslate] })
  @OneToMany(
    () => MediaPresentationTranslate,
    (item) => item.mediaPresentation,
    {
      cascade: true,
      eager: true,
    },
  )
  translate: MediaPresentationTranslate[];

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  pdf: File;

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  image: File;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

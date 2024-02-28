import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../files/entities/file.entity';
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
import { VideoCollectionTranslate } from './video-collection-translate.entity';

@Entity()
export class VideoCollection {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [VideoCollectionTranslate] })
  @OneToMany(() => VideoCollectionTranslate, (item) => item.video_collection, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  translate: VideoCollectionTranslate[];

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  video: File;

  @ApiProperty()
  @Column()
  group: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

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
import { Project } from '../../projects/entities/project.entity';
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
  })
  @JoinColumn()
  video: File;

  @ApiProperty({ type: Project, nullable: true })
  @OneToOne(() => Project, {
    cascade: false,
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  project: Project | null;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

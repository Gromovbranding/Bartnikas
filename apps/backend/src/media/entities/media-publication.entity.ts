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
import { MediaPublicationTranslate } from './media-publication-translate.entity';

@Entity()
export class MediaPublication {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [MediaPublicationTranslate] })
  @OneToMany(() => MediaPublicationTranslate, (item) => item.mediaPublication, {
    cascade: true,
    eager: true,
  })
  translate: MediaPublicationTranslate[];

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ type: 'timestamptz' })
  date: Date;

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
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

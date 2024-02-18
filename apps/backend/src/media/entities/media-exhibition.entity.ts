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
import { MediaExhibitionTranslate } from './media-exhibition-translate.entity';

@Entity()
export class MediaExhibition {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [MediaExhibitionTranslate] })
  @OneToMany(() => MediaExhibitionTranslate, (item) => item.mediaExhibition, {
    cascade: true,
    eager: true,
  })
  translate: MediaExhibitionTranslate[];

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
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

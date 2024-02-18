import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { NewsTranslate } from './news-translate.entity';

@Entity()
export class News {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [NewsTranslate] })
  @OneToMany(() => NewsTranslate, (item) => item.news, {
    cascade: true,
    eager: true,
  })
  translate: NewsTranslate[];

  @ApiProperty()
  @Column({ default: false, type: 'bool' })
  is_hot: boolean;

  @ApiProperty({ type: () => File })
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

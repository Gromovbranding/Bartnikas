import {
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
import { BlogTranslate } from './blog-translate.entity';

@Entity()
export class Blog {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [BlogTranslate] })
  @OneToMany(() => BlogTranslate, (item) => item.blog, {
    cascade: true,
    eager: true,
  })
  translate: BlogTranslate[];

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
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

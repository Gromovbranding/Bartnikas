import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoportalTranslate } from './photoportal-translate.entity';

@Entity()
export class Photoportal {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({ type: () => [PhotoportalTranslate] })
  @OneToMany(() => PhotoportalTranslate, (item) => item.photoportal_translate, {
    cascade: true,
    eager: true,
  })
  translate: PhotoportalTranslate[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

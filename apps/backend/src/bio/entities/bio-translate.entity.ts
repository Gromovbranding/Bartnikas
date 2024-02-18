import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bio } from './bio.entity';
import { Language } from '../../shared/language/entities/language.entity';

@Entity()
export class BioTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Bio })
  @ManyToOne(() => Bio, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  bio: Bio;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'text' })
  sub_description: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.bio_translate, {
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

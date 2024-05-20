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
import { Photoportal } from './photoportal.entity';

@Entity()
export class PhotoportalTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Photoportal, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  photoportal_translate: Photoportal;

  @ApiProperty()
  @Column({ type: 'text' })
  intro_title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  intro_subtitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  intro_action: string;

  @ApiProperty()
  @Column({ type: 'text' })
  peculiarities_title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  peculiarities_list: string;

  @ApiProperty()
  @Column({ type: 'text' })
  influence_title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  influence_quote_text: string;

  @ApiProperty()
  @Column({ type: 'text' })
  influence_quote_accent_text: string;

  @ApiProperty()
  @Column({ type: 'text' })
  influence_quote_author: string;

  @ApiProperty()
  @Column({ type: 'text' })
  for_what_title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  for_what_list: string;

  @ApiProperty()
  @Column({ type: 'text' })
  popup_title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  popup_subtitle_accent: string;

  @ApiProperty()
  @Column({ type: 'text' })
  popup_subtitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  popup_btn: string;

  @ApiProperty()
  @Column({ type: 'text' })
  agreement: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.photoportal_translate, {
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

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
import { Services } from './services.entity';

@Entity()
export class ServicesTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Services, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  services_translate: Services;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerUltraExclusiveAnchor: string;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerSubtitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerQuoteText: string;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerQuoteAuthor: string;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerTransformationTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerListTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  placeOfPowerListItems: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalIntroTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalIntroSubtitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalIntroAction: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalPeculiaritiesTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalPeculiaritiesList: string[];

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalInfluenceTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalInfluenceQuoteText: string[];

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalInfluenceQuoteAccent_text: string[];

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalInfluenceQuoteAuthor: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalForWhatTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalForWhatList: string[];

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalPopupTitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalPopupSubtitle_accent: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalPopupSubtitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalPopupBtn: string;

  @ApiProperty()
  @Column({ type: 'text' })
  photoportalAgreement: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.services_translate, {
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

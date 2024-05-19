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
import { PlaceOfPower } from './place-of-power.entity';

@Entity()
export class PlaceOfPowerTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => PlaceOfPower, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  place_of_power_translate: PlaceOfPower;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  ultra_exclusive_anchor: string;

  @ApiProperty()
  @Column({ type: 'text' })
  subtitle: string;

  @ApiProperty()
  @Column({ type: 'text' })
  quote_text: string;

  @ApiProperty()
  @Column({ type: 'text' })
  quote_author: string;

  @ApiProperty()
  @Column({ type: 'text' })
  transformation_title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  list_title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  list_items: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.place_of_power_translate, {
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

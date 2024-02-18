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
import { GreetingIndex } from './greeting-index.entity';

@Entity()
export class GreetingIndexTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => GreetingIndex, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  greeting_index: GreetingIndex;

  @ApiProperty()
  @Column({ type: 'text' })
  text: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.greeting_index_translate, {
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

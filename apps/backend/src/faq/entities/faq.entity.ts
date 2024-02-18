import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FaqTranslate } from './faq-translate.entity';

@Entity()
export class Faq {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [FaqTranslate] })
  @OneToMany(() => FaqTranslate, (item) => item.faq, {
    cascade: true,
    eager: true,
  })
  translate: FaqTranslate[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

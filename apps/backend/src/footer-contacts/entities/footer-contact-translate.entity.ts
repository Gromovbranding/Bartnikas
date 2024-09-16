import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Language } from 'src/shared/language/entities/language.entity';
import { FooterContact } from './footer-contact.entity';

@Entity()
export class FooterContactTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => FooterContact, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  footer_contact: FooterContact;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.footer_contact_translate, {
    eager: true,
  })
  language: Language;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  socials: { link: string; icon: string }[];

  @ApiProperty()
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  menu_links: { link: string; name: string }[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FooterContactTranslate } from './footer-contact-translate.entity';

@Entity()
export class FooterContact {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [FooterContactTranslate] })
  @OneToMany(() => FooterContactTranslate, (item) => item.footer_contact, {
    cascade: true,
    eager: true,
  })
  translate: FooterContactTranslate[];

  @ApiProperty()
  @Column({ default: false })
  active: boolean;

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  logo: File;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

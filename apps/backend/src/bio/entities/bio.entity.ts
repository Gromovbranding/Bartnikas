import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../files/entities/file.entity';
import { BioTranslate } from './bio-translate.entity';

@Entity()
export class Bio {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [BioTranslate] })
  @OneToMany(() => BioTranslate, (item) => item.bio, {
    cascade: true,
    eager: true,
  })
  translate: BioTranslate[];

  @ApiProperty()
  @Column({ default: false, type: 'bool' })
  is_active: boolean;

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  awatar: File;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

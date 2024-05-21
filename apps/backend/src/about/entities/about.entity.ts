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
import { AboutTranslate } from './about-translate.entity';

@Entity()
export class About {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: false, type: 'bool' })
  is_active: boolean;

  @ApiProperty({ type: () => [AboutTranslate] })
  @OneToMany(() => AboutTranslate, (item) => item.about, {
    cascade: true,
    eager: true,
  })
  translate: AboutTranslate[];

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  video: File;

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  poster: File;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

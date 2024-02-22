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
import { GreetingIndexTranslate } from './greeting-index-translate.entity';

@Entity()
export class GreetingIndex {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: false, type: 'bool' })
  is_active: boolean;

  @ApiProperty({ type: () => [GreetingIndexTranslate] })
  @OneToMany(() => GreetingIndexTranslate, (item) => item.greeting_index, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  translate: GreetingIndexTranslate[];

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  video: File;

  @ApiProperty({ type: File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
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

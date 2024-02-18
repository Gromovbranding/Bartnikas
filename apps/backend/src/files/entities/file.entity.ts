import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { fileUnlink } from '../data/storage';

@Entity()
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeRemove()
  async unlinkFile() {
    try {
      await fileUnlink(this.name);
    } catch (exc) {
      throw exc;
    }
  }
}

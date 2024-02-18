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
import { ProjectCollab } from './project-collab.entity';

@Entity()
export class ProjectCollabTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => ProjectCollab, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  project_collab: ProjectCollab;

  @ApiProperty()
  @Column()
  collab_with: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.project_collab_translate, {
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

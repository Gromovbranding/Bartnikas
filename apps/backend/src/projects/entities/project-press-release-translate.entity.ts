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
import { ProjectPressRelease } from './project-press-release.entity';

@Entity()
export class ProjectPressReleaseTranslate {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => ProjectPressRelease, (item) => item.translate, {
    onDelete: 'CASCADE',
  })
  project_press_release: ProjectPressRelease;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  text: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(() => Language, (item) => item.project_press_release_translate, {
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

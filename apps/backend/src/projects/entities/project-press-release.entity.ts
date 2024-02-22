import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { ProjectCollab } from './project-collab.entity';
import { ProjectPressReleaseTranslate } from './project-press-release-translate.entity';

@Entity()
export class ProjectPressRelease {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [ProjectCollab] })
  @ManyToOne(
    () => ProjectCollab,
    (projectCollab) => projectCollab.press_release,
    {
      onDelete: 'CASCADE',
    },
  )
  projectCollab: ProjectCollab;

  @ApiProperty({ type: () => [ProjectPressReleaseTranslate] })
  @OneToMany(
    () => ProjectPressReleaseTranslate,
    (item) => item.project_press_release,
    {
      cascade: true,
      eager: true,
    },
  )
  translate: ProjectPressReleaseTranslate[];

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  file: File;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

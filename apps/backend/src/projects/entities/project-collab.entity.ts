import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { ProjectPressRelease } from './project-press-release.entity';
import { File } from '../../files/entities/file.entity';
import { ProjectCollabTranslate } from './project-collab-translate.entity';

@Entity()
export class ProjectCollab {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [ProjectCollabTranslate] })
  @OneToMany(() => ProjectCollabTranslate, (item) => item.project_collab, {
    cascade: true,
    eager: true,
  })
  translate: ProjectCollabTranslate[];

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  video: File;

  @ApiProperty({ type: () => [ProjectPressRelease] })
  @OneToMany(() => ProjectPressRelease, (release) => release.projectCollab, {
    eager: true,
    cascade: true,
  })
  press_release: ProjectPressRelease[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

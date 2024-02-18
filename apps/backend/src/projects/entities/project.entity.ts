import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectImageDetail } from './project-image-detail.entity';
import { ProjectCollab } from './project-collab.entity';
import { ProjectTranslate } from './project-translate.entity';

@Entity()
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [ProjectTranslate] })
  @OneToMany(() => ProjectTranslate, (item) => item.project, {
    cascade: true,
    eager: true,
  })
  translate: ProjectTranslate[];

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  is_show_index_footer_card: boolean;

  @ApiProperty({ type: () => [ProjectImageDetail] })
  @OneToMany(() => ProjectImageDetail, (details) => details.project, {
    eager: true,
    cascade: true,
  })
  details: ProjectImageDetail[];

  @ApiProperty({ nullable: true, default: null })
  @Column({ nullable: true, default: null })
  group: string | null;

  @ApiProperty({ type: ProjectCollab, nullable: true })
  @OneToOne(() => ProjectCollab, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  collab: ProjectCollab | null;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

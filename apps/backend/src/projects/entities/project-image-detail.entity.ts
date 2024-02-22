import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectImageSizes } from './project-image-sizes.entity';
import { Project } from './project.entity';
import { File } from '../../files/entities/file.entity';

@Entity()
export class ProjectImageDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [ProjectImageSizes] })
  @ManyToMany(() => ProjectImageSizes, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  sizes: ProjectImageSizes[];

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column({ default: 0 })
  order: number;

  @ApiProperty()
  @Column({ default: false, type: 'bool' })
  is_show_poster: boolean;

  @ApiProperty({ default: true })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty()
  @Column()
  image_name: string;

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  image: File;

  @ApiProperty({ type: () => Project })
  @ManyToOne(() => Project, (project) => project.details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  project: Project;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

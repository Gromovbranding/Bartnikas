import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AwardsDegree } from './awards-degree.entity';
import { File } from '../../files/entities/file.entity';

export enum ListDegree {
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze',
  PeopleChoice = "People's choice Awards",
  Honorable = 'Honorable mention',
  Remarkable = 'Remarkable artwork',
  First = '1 place',
  Second = '2 place',
  Third = '3 place',
}

@Entity()
export class AwardsDegreeGroup {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => AwardsDegree, (degree) => degree.groups, {
    onDelete: 'CASCADE',
  })
  degree: AwardsDegree;

  @ApiProperty({ enum: ListDegree })
  @Column({ enum: ListDegree, type: 'enum', default: ListDegree.Gold })
  type: ListDegree;

  @ApiProperty({ type: () => [File] })
  @ManyToMany(() => File, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  images: File[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

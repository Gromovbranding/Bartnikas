import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Awards } from './awards.entity';
import { AwardsDegreeGroup } from './awards-degree-group.entity';

@Entity()
export class AwardsDegree {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [Awards] })
  @ManyToOne(() => Awards, (awards) => awards.degress, {
    onDelete: 'CASCADE',
  })
  awards: Awards;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty({ type: () => [AwardsDegreeGroup] })
  @OneToMany(() => AwardsDegreeGroup, (group) => group.degree, {
    cascade: true,
    eager: true,
  })
  groups: AwardsDegreeGroup[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { AwardsDegree } from './awards-degree.entity';
import { AwardsTranslate } from './awards-translate.entity';

@Entity()
export class Awards {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => File })
  @OneToOne(() => File, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  awards_avatar: File;

  @ApiProperty({ type: () => [AwardsTranslate] })
  @OneToMany(() => AwardsTranslate, (item) => item.awards, {
    cascade: true,
    eager: true,
  })
  translate: AwardsTranslate[];

  @ApiProperty({ type: () => [AwardsDegree] })
  @OneToMany(() => AwardsDegree, (degress) => degress.awards, {
    cascade: true,
    eager: true,
  })
  degress: AwardsDegree[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlaceOfPowerTranslate } from './place-of-power-translate.entity';

@Entity()
export class PlaceOfPower {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({ type: () => [PlaceOfPowerTranslate] })
  @OneToMany(
    () => PlaceOfPowerTranslate,
    (item) => item.place_of_power_translate,
    {
      cascade: true,
      eager: true,
    },
  )
  translate: PlaceOfPowerTranslate[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

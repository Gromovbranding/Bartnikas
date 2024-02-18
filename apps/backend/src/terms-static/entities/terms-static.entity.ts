import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TermsStaticTranslate } from './terms-static-translate.entity';

@Entity()
export class TermsStatic {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => [TermsStaticTranslate] })
  @OneToMany(() => TermsStaticTranslate, (item) => item.terms_static, {
    cascade: true,
    eager: true,
  })
  translate: TermsStaticTranslate[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

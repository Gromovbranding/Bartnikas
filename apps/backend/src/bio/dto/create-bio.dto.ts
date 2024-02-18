import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFileDbDto } from 'src/files/dto/create-file-db.dto';
import { CreateTranslateLanguageDto } from '../../shared/language/dto/create-translate.dto';

export class CreateTranslateBioDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sub_description: string;
}

export class CreateBioDto {
  @ApiProperty({ type: () => [CreateTranslateBioDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateBioDto)
  translate: CreateTranslateBioDto[];

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  is_active = false;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateFileDbDto)
  awatar: CreateFileDbDto;
}

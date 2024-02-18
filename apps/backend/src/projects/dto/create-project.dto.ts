import {
  IsObject,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  ValidateIf,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import { UnitSize } from '../entities/project-image-sizes.entity';
import { CreateTranslateLanguageDto } from '../../shared/language/dto/create-translate.dto';

export class CreateTranslateProjectPressRelease extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CreateProjectPressRelease {
  @ApiProperty({ type: () => [CreateTranslateProjectPressRelease] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateProjectPressRelease)
  translate: CreateTranslateProjectPressRelease[];

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  file: CreateFileDbDto;
}

export class CreateTranslateProjectCollab extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  collab_with: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateProjectCollab {
  @ApiProperty({ type: () => [CreateTranslateProjectCollab] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateProjectCollab)
  translate: CreateTranslateProjectCollab[];

  @ApiProperty({ type: () => [CreateProjectPressRelease] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectPressRelease)
  press_release: CreateProjectPressRelease[];

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  video: CreateFileDbDto;
}

export class CreateProjectImageSizesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ enum: UnitSize })
  @IsEnum(UnitSize)
  unit: UnitSize;
}

export class CreateProjectImageDetailDto {
  @ApiProperty({ type: () => [CreateProjectImageSizesDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProjectImageSizesDto)
  sizes: CreateProjectImageSizesDto[];

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  is_show_poster = false;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image_name: string;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;
}

export class CreateTranslateProjectDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateProjectDto {
  @ApiProperty({ type: () => [CreateTranslateProjectDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateProjectDto)
  translate: CreateTranslateProjectDto[];

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsNotEmpty()
  is_show_index_footer_card: boolean;

  @ApiProperty({ nullable: true, default: null })
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  group: string | null;

  @ApiProperty({ type: () => [CreateProjectImageDetailDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProjectImageDetailDto)
  details: CreateProjectImageDetailDto[];

  @ApiProperty({ type: CreateProjectCollab })
  @ValidateIf((_, val) => val !== null)
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectCollab)
  collab: CreateProjectCollab;
}

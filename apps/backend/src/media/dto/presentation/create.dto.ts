import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreateFileDbDto } from '../../../files/dto/create-file-db.dto';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTranslateLanguageDto } from '../../../shared/language/dto/create-translate.dto';

export class CreateTranslateMediaPresentationDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CreateMediaPresentationDto {
  @ApiProperty({ type: () => [CreateTranslateMediaPresentationDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateMediaPresentationDto)
  translate: CreateTranslateMediaPresentationDto[];

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  pdf: CreateFileDbDto;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;
}

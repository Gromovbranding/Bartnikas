import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreateFileDbDto } from '../../../files/dto/create-file-db.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTranslateLanguageDto } from '../../../shared/language/dto/create-translate.dto';

export class CreateTranslateMediaPublicationDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  program: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subtitle: string;
}

export class CreateMediaPublicationDto {
  @ApiProperty({ type: () => [CreateTranslateMediaPublicationDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateMediaPublicationDto)
  translate: CreateTranslateMediaPublicationDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;
}

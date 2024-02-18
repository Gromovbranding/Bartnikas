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

export class CreateTranslateMediaExhibitionDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  awards: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CreateMediaExhibitionDto {
  @ApiProperty({ type: () => [CreateTranslateMediaExhibitionDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateMediaExhibitionDto)
  translate: CreateTranslateMediaExhibitionDto[];

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;
}

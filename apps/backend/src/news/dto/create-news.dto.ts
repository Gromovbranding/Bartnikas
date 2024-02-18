import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import { CreateTranslateLanguageDto } from '../../shared/language/dto/create-translate.dto';

export class CreateTranslateNewsDto extends IntersectionType(
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CreateNewsDto {
  @ApiProperty({ type: () => [CreateTranslateNewsDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateNewsDto)
  translate: CreateTranslateNewsDto[];

  @ApiPropertyOptional()
  @IsBoolean()
  is_hot = false;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;
}

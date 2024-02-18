import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import { CreateTranslateLanguageDto } from '../../shared/language/dto/create-translate.dto';

export class CreateTranslateBlogDto extends IntersectionType(
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

export class CreateBlogDto {
  @ApiProperty({ type: () => [CreateTranslateBlogDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateBlogDto)
  translate: CreateTranslateBlogDto[];

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;
}

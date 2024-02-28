import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslateVideoCollectionDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CreateVideoCollectionDto {
  @ApiProperty({ type: () => [CreateTranslateVideoCollectionDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateVideoCollectionDto)
  translate: CreateTranslateVideoCollectionDto[];

  @ApiProperty({ type: CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  video: CreateFileDbDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  group: string;
}

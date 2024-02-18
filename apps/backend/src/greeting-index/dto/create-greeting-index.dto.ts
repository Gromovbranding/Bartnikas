import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslateGreetingIndexDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CreateGreetingIndexDto {
  @ApiProperty({ type: () => [CreateTranslateGreetingIndexDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateGreetingIndexDto)
  translate: CreateTranslateGreetingIndexDto[];

  @ApiProperty({ default: false })
  @IsBoolean()
  is_active = false;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  video: CreateFileDbDto;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  poster: CreateFileDbDto;
}

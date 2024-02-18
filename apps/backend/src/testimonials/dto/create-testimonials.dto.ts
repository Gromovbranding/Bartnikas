import {
  IsObject,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ValidateIf,
  IsUrl,
} from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslateTestimonialsDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  additional_info: string;
}

export class CreateTestimonialsDto {
  @ApiProperty({ type: () => [CreateTranslateTestimonialsDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateTestimonialsDto)
  translate: CreateTranslateTestimonialsDto[];

  @ApiProperty()
  @ValidateIf((_, val) => val !== null)
  @IsUrl({
    protocols: ['https'],
    host_whitelist: [/youtube/],
  })
  url?: string;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateIf((obj) => obj.url === null)
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  file?: CreateFileDbDto;
}

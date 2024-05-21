import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

class CreateTranslateAboutAdvantagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

class CreateTranslateAboutRecognitionCitiesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

class CreateTranslateAboutAchievementsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CreateTranslateAboutDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateAboutAdvantagesDto)
  advantages: CreateTranslateAboutAdvantagesDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  concept_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  concept_text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ticker_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ticker_text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recognition_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recognition_text: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateAboutRecognitionCitiesDto)
  recognition_cities: CreateTranslateAboutRecognitionCitiesDto[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateAboutAchievementsDto)
  achievements: CreateTranslateAboutAchievementsDto[];
}

export class CreateAboutDto {
  @ApiProperty({ type: () => [CreateTranslateAboutDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateAboutDto)
  translate: CreateTranslateAboutDto[];

  @ApiProperty({ default: false })
  @IsBoolean()
  is_active = false;
}

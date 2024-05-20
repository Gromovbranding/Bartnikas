import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslatePhotoportalDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  intro_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  intro_subtitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  intro_action: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  peculiarities_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  peculiarities_list: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  influence_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  influence_quote_text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  influence_quote_accent_text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  influence_quote_author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  for_what_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  for_what_list: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_subtitle_accent: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_subtitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_btn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agreement: string;
}

export class CreatePhotoportalDto {
  @ApiProperty({ default: false })
  @IsBoolean()
  is_active = false;

  @ApiProperty({ type: () => [CreateTranslatePhotoportalDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslatePhotoportalDto)
  translate: CreateTranslatePhotoportalDto[];
}

export class CreateTranslatePlaceOfPowerDto extends IntersectionType(
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
  @IsNotEmpty()
  @IsString()
  quote_text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quote_author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transformation_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  list_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  list_items: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  artefact_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  artefact_text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  exclusive_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  exclusive_head_text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  exclusive_subtitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  exclusive_footer_info: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  exclusive_footer_btn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_subtitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_note: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  popup_btn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agreement: string;
}

export class CreatePlaceOfPowerDto {
  @ApiProperty({ default: false })
  @IsBoolean()
  is_active = false;

  @ApiProperty({ type: () => [CreateTranslatePlaceOfPowerDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslatePlaceOfPowerDto)
  translate: CreateTranslatePlaceOfPowerDto[];
}

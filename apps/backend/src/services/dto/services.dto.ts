import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, ValidateNested } from 'class-validator';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslatePhotoportalDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsBoolean()
  is_active?: boolean = false;
}

export class CreatePhotoportalDto {
  @ApiProperty({ type: () => [CreateTranslatePhotoportalDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslatePhotoportalDto)
  translate: CreateTranslatePhotoportalDto[];
}

export class CreateTranslatePlaceOfPowerDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsBoolean()
  is_active?: boolean = false;
}

export class CreatePlaceOfPowerDto {
  @ApiProperty({ type: () => [CreateTranslatePlaceOfPowerDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslatePlaceOfPowerDto)
  translate: CreateTranslatePlaceOfPowerDto[];
}

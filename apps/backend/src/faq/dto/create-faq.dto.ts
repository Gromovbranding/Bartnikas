import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTranslateLanguageDto } from '../../shared/language/dto/create-translate.dto';

export class CreateTranslateFaqDto extends IntersectionType(
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
}

export class CreateFaqDto {
  @ApiProperty({ type: () => [CreateTranslateFaqDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateFaqDto)
  translate: CreateTranslateFaqDto[];
}

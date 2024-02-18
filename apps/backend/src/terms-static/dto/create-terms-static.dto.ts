import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslateTermsStaticDto extends IntersectionType(
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

export class CreateTermsStaticDto {
  @ApiProperty({ type: () => [CreateTranslateTermsStaticDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateTermsStaticDto)
  translate: CreateTranslateTermsStaticDto[];
}

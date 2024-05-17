import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, ValidateNested } from 'class-validator';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslateServicesDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsBoolean()
  is_active?: boolean = false;
}

export class CreateServicesDto {
  @ApiProperty({ type: () => [CreateTranslateServicesDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateServicesDto)
  translate: CreateTranslateServicesDto[];
}

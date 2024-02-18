import { IsNotEmpty, IsLocale } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslateLanguageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsLocale()
  code: string;
}

import { IsNotEmpty, IsString, IsLocale } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsLocale()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

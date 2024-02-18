import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateGeneralInfoDto {
  @ApiProperty()
  @ValidateIf((_, val) => val !== null)
  @IsNotEmpty()
  @IsEmail()
  email_press?: string;

  @ApiProperty()
  @ValidateIf((_, val) => val !== null)
  @IsNotEmpty()
  @IsEmail()
  email_gallery?: string;

  @ApiProperty()
  @IsBoolean()
  is_active?: boolean = false;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class ParamButton {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;
}

export class CreateIndexCardFooterDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ParamButton)
  button: ParamButton;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

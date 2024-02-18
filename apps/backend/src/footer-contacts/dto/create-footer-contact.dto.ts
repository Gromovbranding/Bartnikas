import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';

class ParamSocials {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  icon: string;
}

class ParamMenuLinks {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateFooterContactDto {
  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParamSocials)
  socials: ParamSocials[];

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParamMenuLinks)
  menu_links: ParamMenuLinks[];

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({ type: () => [CreateFileDbDto] })
  @IsObject()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateFileDbDto)
  logo: CreateFileDbDto;
}

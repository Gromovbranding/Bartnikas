import { ApiProperty, IntersectionType } from '@nestjs/swagger';
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
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

class CreateTranslateParamItemSocials {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  icon: string;
}

class CreateTranslateParamMenuItemLinkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

class CreateTranslateFooterContactDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateParamItemSocials)
  socials: CreateTranslateParamItemSocials[];

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateParamMenuItemLinkDto)
  menu_links: CreateTranslateParamMenuItemLinkDto[];
}

export class CreateFooterContactDto {
  @ApiProperty({ type: () => [CreateTranslateFooterContactDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateFooterContactDto)
  translate: CreateTranslateFooterContactDto[];

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

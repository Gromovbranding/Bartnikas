import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
  Min,
  Max,
  IsNumber,
  IsArray,
} from 'class-validator';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import { Type } from 'class-transformer';
import { ListDegree } from '../entities/awards-degree-group.entity';
import { CreateTranslateLanguageDto } from '../../shared/language/dto/create-translate.dto';

export class CreateTranslateAwardDto extends IntersectionType(
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

export class CreateAwardsDto {
  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  awards_avatar: CreateFileDbDto;

  @ApiProperty({ type: () => [CreateTranslateAwardDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateAwardDto)
  translate: CreateTranslateAwardDto[];

  @ApiProperty({ type: () => [CreateAwardsDegreeDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateAwardsDegreeDto)
  degress: CreateAwardsDegreeDto[];
}

export class CreateAwardsDegreeDto {
  @ApiProperty()
  @IsNumber()
  @Min(new Date().getFullYear() - 100)
  @Max(new Date().getFullYear())
  year: number;

  @ApiProperty({ type: () => [CreateAwardsDegreeGroupDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateAwardsDegreeGroupDto)
  groups: CreateAwardsDegreeGroupDto[];
}

export class CreateAwardsDegreeGroupDto {
  @ApiProperty({ enum: ListDegree })
  @IsEnum(ListDegree)
  @IsNotEmpty()
  type: ListDegree = ListDegree.Gold;

  @ApiProperty({ type: () => [CreateFileDbDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  images: CreateFileDbDto[];
}

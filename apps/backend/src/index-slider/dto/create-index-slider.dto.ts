import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';

export class CreateIndexSliderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => [CreateFileDbDto] })
  @IsObject()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

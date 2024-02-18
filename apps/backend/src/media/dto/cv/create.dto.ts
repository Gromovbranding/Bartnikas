import { ApiProperty } from '@nestjs/swagger';
import { CreateFileDbDto } from '../../../files/dto/create-file-db.dto';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMediaCVDto {
  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  image: CreateFileDbDto;

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  pdf: CreateFileDbDto;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileDbDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

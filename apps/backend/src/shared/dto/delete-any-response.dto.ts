import { ApiProperty } from '@nestjs/swagger';

export class DeleteAnyResponseDto {
  @ApiProperty({ isArray: true })
  raw: any[];

  @ApiProperty()
  affected: number;
}

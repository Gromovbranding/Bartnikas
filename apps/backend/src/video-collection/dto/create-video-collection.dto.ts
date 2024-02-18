import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateFileDbDto } from '../../files/dto/create-file-db.dto';
import { Project } from '../../projects/entities/project.entity';
import { CreateTranslateLanguageDto } from 'src/shared/language/dto/create-translate.dto';

export class CreateTranslateVideoCollectionDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CreateVideoCollectionDto {
  @ApiProperty({ type: () => [CreateTranslateVideoCollectionDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateVideoCollectionDto)
  translate: CreateTranslateVideoCollectionDto[];

  @ApiProperty({ type: CreateFileDbDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateFileDbDto)
  video: CreateFileDbDto;

  @ApiProperty({ type: Project, nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsObject()
  project?: Project;
}

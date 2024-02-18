import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFileDbDto } from 'src/files/dto/create-file-db.dto';
import { CreateTranslateLanguageDto } from '../../shared/language/dto/create-translate.dto';

export class CreateTranslateBioTestimonialDto extends IntersectionType(
  CreateTranslateLanguageDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  job: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  testimonial: string;
}

export class CreateBioTestimonialDto {
  @ApiProperty({ type: () => [CreateTranslateBioTestimonialDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateTranslateBioTestimonialDto)
  translate: CreateTranslateBioTestimonialDto[];

  @ApiProperty({ type: () => CreateFileDbDto })
  @IsObject()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateFileDbDto)
  photo: CreateFileDbDto;
}

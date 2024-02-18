import { PartialType } from '@nestjs/swagger';
import { CreateMediaExhibitionDto } from './create.dto';

export class UpdateMediaExhibitionDto extends PartialType(
  CreateMediaExhibitionDto,
) {}

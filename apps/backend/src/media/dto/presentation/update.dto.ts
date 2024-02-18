import { PartialType } from '@nestjs/swagger';
import { CreateMediaPresentationDto } from './create.dto';

export class UpdateMediaPresentationDto extends PartialType(
  CreateMediaPresentationDto,
) {}

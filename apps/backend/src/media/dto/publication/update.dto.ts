import { PartialType } from '@nestjs/swagger';
import { CreateMediaPublicationDto } from './create.dto';

export class UpdateMediaPublicationDto extends PartialType(
  CreateMediaPublicationDto,
) {}

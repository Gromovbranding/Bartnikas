import { PartialType } from '@nestjs/swagger';
import { CreateVideoCollectionDto } from './create-video-collection.dto';

export class UpdateVideoCollectionDto extends PartialType(
  CreateVideoCollectionDto,
) {}

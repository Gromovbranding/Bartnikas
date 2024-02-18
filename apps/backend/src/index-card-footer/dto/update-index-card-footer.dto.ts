import { PartialType } from '@nestjs/swagger';
import { CreateIndexCardFooterDto } from './create-index-card-footer.dto';

export class UpdateIndexCardFooterDto extends PartialType(
  CreateIndexCardFooterDto,
) {}

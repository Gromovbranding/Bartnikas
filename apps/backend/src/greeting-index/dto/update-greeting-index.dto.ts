import { PartialType } from '@nestjs/swagger';
import { CreateGreetingIndexDto } from './create-greeting-index.dto';

export class UpdateGreetingIndexDto extends PartialType(
  CreateGreetingIndexDto,
) {}

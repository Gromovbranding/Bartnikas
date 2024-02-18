import { CreateAwardsDto } from './create-awards.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateAwardsDto extends PartialType(CreateAwardsDto) {}

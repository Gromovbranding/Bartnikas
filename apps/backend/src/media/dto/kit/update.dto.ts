import { PartialType } from '@nestjs/swagger';
import { CreateMediaKitDto } from './create.dto';

export class UpdateMediaKitDto extends PartialType(CreateMediaKitDto) {}

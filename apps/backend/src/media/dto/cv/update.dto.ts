import { PartialType } from '@nestjs/swagger';
import { CreateMediaCVDto } from './create.dto';

export class UpdateMediaCVDto extends PartialType(CreateMediaCVDto) {}

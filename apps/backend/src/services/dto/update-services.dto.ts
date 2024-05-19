import { PartialType } from '@nestjs/swagger';
import { CreatePhotoportalDto, CreatePlaceOfPowerDto } from './services.dto';

export class UpdatePhotoportalDto extends PartialType(CreatePhotoportalDto) {}
export class UpdatePlaceOfPowerDto extends PartialType(CreatePlaceOfPowerDto) {}

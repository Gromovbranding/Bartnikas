import { PartialType } from '@nestjs/swagger';
import {
  CreateServicesDto,
  CreatePhotoportalDto,
  CreatePlaceOfPowerDto,
} from './services.dto';

export class UpdateServicesDto extends PartialType(CreateServicesDto) {}
export class UpdatePhotoportalDto extends PartialType(CreatePhotoportalDto) {}
export class UpdatePlaceOfPowerDto extends PartialType(CreatePlaceOfPowerDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateServicesDto } from './services.dto';

export class UpdateServicesDto extends PartialType(CreateServicesDto) {}

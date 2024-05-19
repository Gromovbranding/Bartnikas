import { Controller } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Terms page accordions')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
}

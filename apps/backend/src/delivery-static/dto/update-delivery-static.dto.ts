import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryStaticDto } from './create-delivery-static.dto';

export class UpdateDeliveryStaticDto extends PartialType(
  CreateDeliveryStaticDto,
) {}

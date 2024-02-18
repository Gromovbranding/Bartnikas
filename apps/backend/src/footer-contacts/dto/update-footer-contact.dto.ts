import { PartialType } from '@nestjs/swagger';
import { CreateFooterContactDto } from './create-footer-contact.dto';

export class UpdateFooterContactDto extends PartialType(
  CreateFooterContactDto,
) {}

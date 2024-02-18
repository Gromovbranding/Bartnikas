import { PartialType } from '@nestjs/swagger';
import { CreateTermsStaticDto } from './create-terms-static.dto';

export class UpdateTermsStaticDto extends PartialType(CreateTermsStaticDto) {}

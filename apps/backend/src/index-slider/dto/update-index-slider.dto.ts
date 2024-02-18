import { PartialType } from '@nestjs/swagger';
import { CreateIndexSliderDto } from './create-index-slider.dto';

export class UpdateIndexSliderDto extends PartialType(CreateIndexSliderDto) {}

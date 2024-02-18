import { PartialType } from '@nestjs/swagger';
import { CreateTestimonialsDto } from './create-testimonials.dto';

export class UpdateTestimonialsDto extends PartialType(CreateTestimonialsDto) {}

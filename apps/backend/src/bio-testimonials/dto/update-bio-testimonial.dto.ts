import { PartialType } from '@nestjs/swagger';
import { CreateBioTestimonialDto } from './create-bio-testimonial.dto';

export class UpdateBioTestimonialDto extends PartialType(
  CreateBioTestimonialDto,
) {}

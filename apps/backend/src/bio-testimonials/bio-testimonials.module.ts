import { Module } from '@nestjs/common';
import { BioTestimonialsService } from './bio-testimonials.service';
import { BioTestimonialsController } from './bio-testimonials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioTestimonial } from './entities/bio-testimonial.entity';
import { BioTestimonialTranslate } from './entities/bio-testimonial-translate.entity';
import { LanguageModule } from '../shared/language/language.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BioTestimonial, BioTestimonialTranslate]),
    LanguageModule,
  ],
  controllers: [BioTestimonialsController],
  providers: [BioTestimonialsService],
})
export class BioTestimonialsModule {}

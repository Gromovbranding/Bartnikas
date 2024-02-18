import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { Testimonials } from './entities/testimonials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsTranslate } from './entities/testimonials-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testimonials, TestimonialsTranslate]),
    LanguageModule,
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}

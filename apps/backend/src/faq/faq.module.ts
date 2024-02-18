import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { FaqTranslate } from './entities/faq-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([Faq, FaqTranslate]), LanguageModule],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}

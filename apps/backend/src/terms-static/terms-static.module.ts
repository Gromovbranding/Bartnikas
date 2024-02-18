import { Module } from '@nestjs/common';
import { TermsStaticService } from './terms-static.service';
import { TermsStaticController } from './terms-static.controller';
import { TermsStatic } from './entities/terms-static.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsStaticTranslate } from './entities/terms-static-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TermsStatic, TermsStaticTranslate]),
    LanguageModule,
  ],
  controllers: [TermsStaticController],
  providers: [TermsStaticService],
})
export class TermsStaticModule {}

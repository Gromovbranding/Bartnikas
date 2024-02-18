import { Module } from '@nestjs/common';
import { BioService } from './bio.service';
import { BioController } from './bio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bio } from './entities/bio.entity';
import { LanguageModule } from '../shared/language/language.module';
import { BioTranslate } from './entities/bio-translate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bio, BioTranslate]), LanguageModule],
  controllers: [BioController],
  providers: [BioService],
})
export class BioModule {}

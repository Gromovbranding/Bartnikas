import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from './entities/about.entity';
import { AboutTranslate } from './entities/about-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([About, AboutTranslate]), LanguageModule],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}

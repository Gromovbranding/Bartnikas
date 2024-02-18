import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsTranslate } from './entities/news-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([News, NewsTranslate]), LanguageModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogTranslate } from './entities/blog-translate.entity';
import { LanguageModule } from '../shared/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogTranslate]), LanguageModule],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}

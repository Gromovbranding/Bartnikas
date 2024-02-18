import { Module } from '@nestjs/common';
import { GreetingIndexService } from './greeting-index.service';
import { GreetingIndexController } from './greeting-index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GreetingIndex } from './entities/greeting-index.entity';
import { GreetingIndexTranslate } from './entities/greeting-index-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GreetingIndex, GreetingIndexTranslate]),
    LanguageModule,
  ],
  controllers: [GreetingIndexController],
  providers: [GreetingIndexService],
})
export class GreetingIndexModule {}

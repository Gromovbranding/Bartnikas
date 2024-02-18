import { Module } from '@nestjs/common';
import { VideoCollectionService } from './video-collection.service';
import { VideoCollectionController } from './video-collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoCollection } from './entities/video-collection.entity';
import { ProjectsModule } from '../projects/projects.module';
import { VideoCollectionTranslate } from './entities/video-collection-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoCollection, VideoCollectionTranslate]),
    ProjectsModule,
    LanguageModule,
  ],
  controllers: [VideoCollectionController],
  providers: [VideoCollectionService],
  exports: [VideoCollectionService],
})
export class VideoCollectionModule {}

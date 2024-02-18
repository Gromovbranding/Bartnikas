import { Module } from '@nestjs/common';
import { MediaKitService } from './services/media-kit.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaKit } from './entities/media-kit.entity';
import { MediaPresentationService } from './services/media-presentation.service';
import { MediaPresentation } from './entities/media-presentation.entity';
import { MediaPublicationService } from './services/media-publication.service';
import { MediaPublication } from './entities/media-publication.entity';
import { MediaExhibition } from './entities/media-exhibition.entity';
import { MediaExhibitionService } from './services/media-exhibition.service';
import { MediaCVService } from './services/media-cv.service';
import { MediaCV } from './entities/media-cv.entity';
import { MediaExhibitionTranslate } from './entities/media-exhibition-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';
import { MediaPresentationTranslate } from './entities/media-presentation-translate.entity';
import { MediaPublicationTranslate } from './entities/media-publication-translate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MediaKit,
      MediaPresentation,
      MediaPresentationTranslate,
      MediaPublication,
      MediaPublicationTranslate,
      MediaExhibition,
      MediaExhibitionTranslate,
      MediaCV,
    ]),
    LanguageModule,
  ],
  controllers: [MediaController],
  providers: [
    MediaKitService,
    MediaPresentationService,
    MediaPublicationService,
    MediaExhibitionService,
    MediaCVService,
  ],
})
export class MediaModule {}

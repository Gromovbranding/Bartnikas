import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from 'src/shared/language/language.module';
import { PlaceOfPower } from './entities/place-of-power.entity';
import { PlaceOfPowerTranslate } from './entities/place-of-power-translate.entity';
import { Photoportal } from './entities/photoportal.entity';
import { PhotoportalTranslate } from './entities/photoportal-translate.entity';
import { PlaceOfPowerService } from './place-of-power.service';
import { PhotoportalService } from './photoportal.service';
import { PlaceOfPowerController } from './place-of-power.controller';
import { PhotoportalController } from './photoportal.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlaceOfPower,
      PlaceOfPowerTranslate,
      Photoportal,
      PhotoportalTranslate,
    ]),
    LanguageModule,
  ],
  controllers: [PlaceOfPowerController, PhotoportalController],
  providers: [PlaceOfPowerService, PhotoportalService],
})
export class ServicesModule {}

import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from 'src/shared/language/language.module';
import { PlaceOfPower } from './entities/place-of-power.entity';
import { PlaceOfPowerTranslate } from './entities/place-of-power-translate.entity';
import { Photoportal } from './entities/photoportal.entity';
import { PhotoportalTranslate } from './entities/photoportal-translate.entity';

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
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}

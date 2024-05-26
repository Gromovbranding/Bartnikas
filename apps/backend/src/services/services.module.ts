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
import { Services } from './entities/services.entity';
import { ServicesTranslate } from './entities/services-translate.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { EmailSender } from 'src/shared/services/email-sender.service';
import { PaymentsService } from 'src/shared/services/payments.service';
import { PhotoportalOrder } from './entities/photoportal-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Services,
      ServicesTranslate,
      PlaceOfPower,
      PlaceOfPowerTranslate,
      Photoportal,
      PhotoportalTranslate,
      PhotoportalOrder,
    ]),
    LanguageModule,
  ],
  controllers: [
    ServicesController,
    PlaceOfPowerController,
    PhotoportalController,
  ],
  providers: [
    ServicesService,
    PlaceOfPowerService,
    PhotoportalService,
    EmailSender,
    PaymentsService,
  ],
})
export class ServicesModule {}

import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Services } from './entities/services.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesTranslate } from './entities/services-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Services, ServicesTranslate]),
    LanguageModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}

import { Module } from '@nestjs/common';
import { AwardsController } from './awards.controller';
import { AwardsService } from './awards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Awards } from './entities/awards.entity';
import { AwardsDegree } from './entities/awards-degree.entity';
import { AwardsDegreeGroup } from './entities/awards-degree-group.entity';
import { LanguageModule } from 'src/shared/language/language.module';
import { AwardsTranslate } from './entities/awards-translate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Awards,
      AwardsDegree,
      AwardsDegreeGroup,
      AwardsTranslate,
    ]),
    LanguageModule,
  ],
  controllers: [AwardsController],
  providers: [AwardsService],
  exports: [AwardsService],
})
export class AwardsModule {}

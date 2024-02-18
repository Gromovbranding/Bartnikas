import { Module } from '@nestjs/common';
import { IndexSliderService } from './index-slider.service';
import { IndexSliderController } from './index-slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndexSlider } from './entities/index-slider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndexSlider])],
  providers: [IndexSliderService],
  controllers: [IndexSliderController],
  exports: [IndexSliderService],
})
export class IndexSliderModule {}

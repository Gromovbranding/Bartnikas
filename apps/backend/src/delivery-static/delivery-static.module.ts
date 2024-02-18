import { Module } from '@nestjs/common';
import { DeliveryStaticService } from './delivery-static.service';
import { DeliveryStatic } from './entities/delivery-static.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryStatic])],
  controllers: [],
  providers: [DeliveryStaticService],
})
export class DeliveryStaticModule {}

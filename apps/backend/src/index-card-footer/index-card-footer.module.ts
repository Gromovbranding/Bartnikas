import { Module } from '@nestjs/common';
import { IndexCardFooterService } from './index-card-footer.service';
import { IndexCardFooterController } from './index-card-footer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndexCardFooter } from './entities/index-card-footer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndexCardFooter])],
  controllers: [IndexCardFooterController],
  providers: [IndexCardFooterService],
  exports: [IndexCardFooterService],
})
export class IndexCardFooterModule {}

import { Module } from '@nestjs/common';
import { FooterContactsService } from './footer-contacts.service';
import { FooterContactsController } from './footer-contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooterContact } from './entities/footer-contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FooterContact])],
  controllers: [FooterContactsController],
  providers: [FooterContactsService],
  exports: [FooterContactsService],
})
export class FooterContactsModule {}

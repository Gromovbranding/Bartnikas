import { Module } from '@nestjs/common';
import { FooterContactsService } from './footer-contacts.service';
import { FooterContactsController } from './footer-contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooterContact } from './entities/footer-contact.entity';
import { LanguageModule } from '../shared/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([FooterContact]), LanguageModule],
  controllers: [FooterContactsController],
  providers: [FooterContactsService],
  exports: [FooterContactsService],
})
export class FooterContactsModule {}

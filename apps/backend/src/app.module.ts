import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { BlogsModule } from './blogs/blogs.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { IndexSliderModule } from './index-slider/index-slider.module';
import { ContactsModule } from './contacts/contacts.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { AwardsModule } from './awards/awards.module';
import { VideoCollectionModule } from './video-collection/video-collection.module';
import { MediaModule } from './media/media.module';
import { GreetingIndexModule } from './greeting-index/greeting-index.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { FaqModule } from './faq/faq.module';
import { BioModule } from './bio/bio.module';
import { BioTestimonialsModule } from './bio-testimonials/bio-testimonials.module';
import { DeliveryStaticModule } from './delivery-static/delivery-static.module';
import { TermsStaticModule } from './terms-static/terms-static.module';
import { FooterContactsModule } from './footer-contacts/footer-contacts.module';
import { IndexCardFooterModule } from './index-card-footer/index-card-footer.module';
import { GeneralInfoModule } from './general-info/general-info.module';
import { LanguageModule } from './shared/language/language.module';
import migration from './config/migration';
import emailSmpt from './config/email-smpt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ServicesModule } from './services/services.module';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('email-smtp'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [migration, emailSmpt],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../uploads/files'),
      exclude: ['/api/(.*)'],
      serveRoot: '/files',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
    }),

    ServicesModule,
    NewsModule,
    BlogsModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    FilesModule,
    IndexSliderModule,
    ContactsModule,
    TestimonialsModule,
    AwardsModule,
    VideoCollectionModule,
    MediaModule,
    GreetingIndexModule,
    FaqModule,
    BioModule,
    BioTestimonialsModule,
    DeliveryStaticModule,
    TermsStaticModule,
    FooterContactsModule,
    IndexCardFooterModule,
    GeneralInfoModule,
    LanguageModule,
  ],
})
export class AppModule {}

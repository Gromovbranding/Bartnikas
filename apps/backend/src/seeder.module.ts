import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SeederService } from './seeder.service';
import { TypeOrmConfig } from './typeOrm.config';
import { ConfigModule } from '@nestjs/config';
import { VideoCollectionModule } from './video-collection/video-collection.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { NewsModule } from './news/news.module';
import { IndexSliderModule } from './index-slider/index-slider.module';
import { ContactsModule } from './contacts/contacts.module';
import { BlogsModule } from './blogs/blogs.module';
import { AwardsModule } from './awards/awards.module';
import { FilesModule } from './files/files.module';
import { ProjectsModule } from './projects/projects.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        requireTLS: true,
        debug: true,
        tls: {
          ciphers: 'SSLv3',
        },
        auth: {
          user: 'love@stanislavbartnikas.com',
          pass: 'zEgmyd-connih-hahni0',
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmConfig,
    UsersModule,
    VideoCollectionModule,
    TestimonialsModule,
    NewsModule,
    IndexSliderModule,
    ContactsModule,
    BlogsModule,
    AwardsModule,
    FilesModule,
    ProjectsModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}

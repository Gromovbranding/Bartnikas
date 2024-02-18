import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectImageDetail } from './entities/project-image-detail.entity';
import { ProjectImageSizes } from './entities/project-image-sizes.entity';
import { ProjectPressRelease } from './entities/project-press-release.entity';
import { ProjectCollab } from './entities/project-collab.entity';
import { EmailSender } from 'src/shared/services/email-sender.service';
import { PaymentsService } from 'src/shared/services/payments.service';
import { ProjectPaymentByEmail } from './entities/project-payment-by-email.entity';
import { ProjectCollabTranslate } from './entities/project-collab-translate.entity';
import { ProjectPressReleaseTranslate } from './entities/project-press-release-translate.entity';
import { LanguageModule } from 'src/shared/language/language.module';
import { ProjectTranslate } from './entities/project-translate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectTranslate,
      ProjectImageDetail,
      ProjectImageSizes,
      ProjectCollab,
      ProjectCollabTranslate,
      ProjectPressRelease,
      ProjectPressReleaseTranslate,
      ProjectPaymentByEmail,
    ]),
    LanguageModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, EmailSender, PaymentsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BioTranslate } from '../../../bio/entities/bio-translate.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FaqTranslate } from '../../../faq/entities/faq-translate.entity';
import { NewsTranslate } from '../../../news/entities/news-translate.entity';
import { BlogTranslate } from '../../../blogs/entities/blog-translate.entity';
import { MediaExhibitionTranslate } from '../../../media/entities/media-exhibition-translate.entity';
import { MediaPresentationTranslate } from '../../../media/entities/media-presentation-translate.entity';
import { MediaPublicationTranslate } from '../../../media/entities/media-publication-translate.entity';
import { BioTestimonialTranslate } from '../../../bio-testimonials/entities/bio-testimonial-translate.entity';
import { AwardsTranslate } from '../../../awards/entities/awards-translate.entity';
import { ProjectTranslate } from '../../../projects/entities/project-translate.entity';
import { ProjectPressReleaseTranslate } from '../../../projects/entities/project-press-release-translate.entity';
import { ProjectCollabTranslate } from '../../../projects/entities/project-collab-translate.entity';
import { TermsStaticTranslate } from '../../../terms-static/entities/terms-static-translate.entity';
import { GreetingIndexTranslate } from '../../../greeting-index/entities/greeting-index-translate.entity';
import { VideoCollectionTranslate } from '../../../video-collection/entities/video-collection-translate.entity';
import { TestimonialsTranslate } from '../../../testimonials/entities/testimonials-translate.entity';
import { PlaceOfPowerTranslate } from '../../../services/entities/place-of-power-translate.entity';
import { PhotoportalTranslate } from '../../../services/entities/photoportal-translate.entity';

@Entity()
export class Language {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  code: string;

  @ApiHideProperty()
  @OneToMany(() => BioTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  bio_translate: BioTranslate[];

  @ApiHideProperty()
  @OneToMany(() => BioTestimonialTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  bio_testimonial_translate: BioTestimonialTranslate[];

  @ApiHideProperty()
  @OneToMany(() => FaqTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  faq_translate: FaqTranslate[];

  @ApiHideProperty()
  @OneToMany(() => NewsTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  news_translate: NewsTranslate[];

  @ApiHideProperty()
  @OneToMany(() => TestimonialsTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  testimonials_translate: TestimonialsTranslate[];

  @ApiHideProperty()
  @OneToMany(() => VideoCollectionTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  video_collection_translate: VideoCollectionTranslate[];

  @ApiHideProperty()
  @OneToMany(() => BlogTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  blog_translate: BlogTranslate[];

  @ApiHideProperty()
  @OneToMany(() => MediaExhibitionTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  media_exhibition_translate: MediaExhibitionTranslate[];

  @ApiHideProperty()
  @OneToMany(() => MediaPresentationTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  media_presentation_translate: MediaPresentationTranslate[];

  @ApiHideProperty()
  @OneToMany(() => GreetingIndexTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  greeting_index_translate: GreetingIndexTranslate[];

  @ApiHideProperty()
  @OneToMany(() => MediaPublicationTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  media_publication_translate: MediaPublicationTranslate[];

  @ApiHideProperty()
  @OneToMany(() => AwardsTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  awards_translate: AwardsTranslate[];

  @ApiHideProperty()
  @OneToMany(() => ProjectTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  project_translate: ProjectTranslate[];

  @ApiHideProperty()
  @OneToMany(() => ProjectPressReleaseTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  project_press_release_translate: ProjectPressReleaseTranslate[];

  @ApiHideProperty()
  @OneToMany(() => ProjectCollabTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  project_collab_translate: ProjectCollabTranslate[];

  @ApiHideProperty()
  @OneToMany(() => TermsStaticTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  terms_static_translate: TermsStaticTranslate[];

  @ApiHideProperty()
  @OneToMany(() => PhotoportalTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  photoportal_translate: PhotoportalTranslate[];

  @ApiHideProperty()
  @OneToMany(() => PlaceOfPowerTranslate, (item) => item.language, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  place_of_power_translate: PlaceOfPowerTranslate[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}

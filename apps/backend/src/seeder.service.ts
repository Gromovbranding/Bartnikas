import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { VideoCollectionService } from './video-collection/video-collection.service';
import { TestimonialsService } from './testimonials/testimonials.service';
import { NewsService } from './news/news.service';
import { IndexSliderService } from './index-slider/index-slider.service';
import { ContactsService } from './contacts/contacts.service';
import { BlogsService } from './blogs/blogs.service';
import { AwardsService } from './awards/awards.service';
import { ProjectsService } from './projects/projects.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeederService {
  constructor(
    private readonly usersService: UsersService,
    private readonly videoCollectionService: VideoCollectionService,
    private readonly testimonialsService: TestimonialsService,
    private readonly newsService: NewsService,
    private readonly indexSliderService: IndexSliderService,
    private readonly contactsService: ContactsService,
    private readonly blogsService: BlogsService,
    private readonly awardsService: AwardsService,
    private readonly projectsService: ProjectsService,
    private readonly configService: ConfigService,
  ) {}

  async seed() {
    const promises = [this.usersService.seed()];

    await Promise.allSettled(promises);
  }
}

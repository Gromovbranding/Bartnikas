import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateNewsDto, CreateTranslateNewsDto } from './dto/create-news.dto';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateNewsDto) {
    const translate = await this.langService.translate<CreateTranslateNewsDto>(
      dto.translate,
    );

    return await this.newsRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findWithoutNextPrev(id: number) {
    return await this.newsRepository.findOne({
      where: { id },
    });
  }

  async findOneWithPrevNext(id: number) {
    const news = await this.newsRepository.findOne({
      where: { id },
    });

    const prev = await this.newsRepository
      .createQueryBuilder()
      .where('id < :id', { id })
      .orderBy('id', 'DESC')
      .getOne();

    const next = await this.newsRepository
      .createQueryBuilder()
      .where('id > :id', { id })
      .getOne();

    return { ...news, prev, next };
  }

  async findHotNews() {
    return await this.newsRepository.find({
      where: { is_hot: true },
    });
  }

  async findHotOneArticle() {
    return await this.newsRepository.findOne({
      where: { is_hot: true },
      order: {
        created_at: 'ASC',
      },
    });
  }

  async update(id: number, dto: UpdateNewsDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.newsRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const article = await this.newsRepository.findOne({
      where: {
        id,
      },
    });

    if (!article) {
      throw new UnprocessableEntityException();
    }

    return await this.newsRepository.delete(id);
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto, CreateTranslateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateBlogDto) {
    const translate = await this.langService.translate<CreateTranslateBlogDto>(
      dto.translate,
    );

    return await this.blogRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.blogRepository.find();
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
    });

    const prev = await this.blogRepository
      .createQueryBuilder()
      .where('id < :id', { id })
      .orderBy('id', 'DESC')
      .getOne();

    const next = await this.blogRepository
      .createQueryBuilder()
      .where('id > :id', { id })
      .getOne();

    return { ...blog, prev, next };
  }

  async update(id: number, dto: UpdateBlogDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.blogRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.blogRepository.delete(id);
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateFaqDto, CreateTranslateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateFaqDto) {
    const translate = await this.langService.translate<CreateTranslateFaqDto>(
      dto.translate,
    );

    return await this.faqRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.faqRepository.find();
  }

  async findOne(id: number) {
    return await this.faqRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateFaqDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.faqRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.faqRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.faqRepository.delete(id);
  }
}

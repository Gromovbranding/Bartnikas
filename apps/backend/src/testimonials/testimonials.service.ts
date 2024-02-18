import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateTestimonialsDto,
  CreateTranslateTestimonialsDto,
} from './dto/create-testimonials.dto';
import { Repository } from 'typeorm';
import { Testimonials } from './entities/testimonials.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTestimonialsDto } from './dto/update-testimonials.dto';
import { LanguageService } from 'src/shared/language/language.service';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonials)
    private readonly testimonialsRepository: Repository<Testimonials>,
    private readonly langService: LanguageService,
  ) {}

  async createTestimonials(dto: CreateTestimonialsDto) {
    if (dto.url) {
      delete dto.file;
    } else if (dto.file) {
      delete dto.url;
    }

    const translate =
      await this.langService.translate<CreateTranslateTestimonialsDto>(
        dto.translate,
      );

    return await this.testimonialsRepository.save({
      ...dto,
      translate,
    });
  }

  async findOneTestimonials(id: number) {
    return await this.testimonialsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAllTestimonials() {
    return await this.testimonialsRepository.find();
  }

  async updateOneTestimonials(id: number, dto: UpdateTestimonialsDto) {
    if (dto.url) {
      delete dto.file;
    } else if (dto.file) {
      delete dto.url;
    }

    const translate = await this.langService.translate(dto.translate);

    return await this.testimonialsRepository.save({ ...dto, id, translate });
  }

  async removeOneTestimonials(id: number) {
    const isExist = await this.testimonialsRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.testimonialsRepository.delete(id);
  }
}

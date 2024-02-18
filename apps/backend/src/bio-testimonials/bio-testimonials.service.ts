import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateBioTestimonialDto,
  CreateTranslateBioTestimonialDto,
} from './dto/create-bio-testimonial.dto';
import { UpdateBioTestimonialDto } from './dto/update-bio-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BioTestimonial } from './entities/bio-testimonial.entity';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class BioTestimonialsService {
  constructor(
    @InjectRepository(BioTestimonial)
    private readonly bioTestimonialsRepository: Repository<BioTestimonial>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateBioTestimonialDto) {
    const translate =
      await this.langService.translate<CreateTranslateBioTestimonialDto>(
        dto.translate,
      );

    return await this.bioTestimonialsRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.bioTestimonialsRepository.find();
  }

  async findOne(id: number) {
    return await this.bioTestimonialsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateBioTestimonialDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.bioTestimonialsRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.bioTestimonialsRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.bioTestimonialsRepository.delete(id);
  }
}

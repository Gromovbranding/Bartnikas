import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateTermsStaticDto,
  CreateTranslateTermsStaticDto,
} from './dto/create-terms-static.dto';
import { UpdateTermsStaticDto } from './dto/update-terms-static.dto';
import { Repository } from 'typeorm';
import { TermsStatic } from './entities/terms-static.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';

@Injectable()
export class TermsStaticService {
  constructor(
    @InjectRepository(TermsStatic)
    private readonly termsStaticRepository: Repository<TermsStatic>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateTermsStaticDto) {
    const translate =
      await this.langService.translate<CreateTranslateTermsStaticDto>(
        dto.translate,
      );

    return await this.termsStaticRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.termsStaticRepository.find();
  }

  async findOne(id: number) {
    return await this.termsStaticRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateTermsStaticDto) {
    const translate = await this.langService.translate(dto.translate);
    return await this.termsStaticRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.termsStaticRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.termsStaticRepository.delete(id);
  }
}

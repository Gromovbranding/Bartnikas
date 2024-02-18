import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateTranslateLanguageDto } from './dto/create-translate.dto';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async create(dto: CreateLanguageDto) {
    return await this.languageRepository.save(
      this.languageRepository.create(dto),
    );
  }

  async findOneByCode(code: string) {
    return await this.languageRepository.findOneBy({
      code,
    });
  }

  async translate<T>(
    dto: (T & CreateTranslateLanguageDto)[],
  ): Promise<(T & { language: Language })[]> {
    const result = [];
    const wasLangs = [];

    for (const itemDto of dto) {
      if (!wasLangs.includes(itemDto.code)) {
        wasLangs.push(itemDto.code);
        const language = await this.findOneByCode(itemDto.code);

        if (!language) {
          throw new BadRequestException('Invalid locale');
        }

        result.push({
          ...itemDto,
          language,
        });
      }
    }

    return result;
  }
}

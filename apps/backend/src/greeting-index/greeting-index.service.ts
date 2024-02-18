import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateGreetingIndexDto,
  CreateTranslateGreetingIndexDto,
} from './dto/create-greeting-index.dto';
import { UpdateGreetingIndexDto } from './dto/update-greeting-index.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GreetingIndex } from './entities/greeting-index.entity';
import { Repository } from 'typeorm';
import { LanguageService } from 'src/shared/language/language.service';

@Injectable()
export class GreetingIndexService {
  constructor(
    @InjectRepository(GreetingIndex)
    private readonly greetingIndexRepository: Repository<GreetingIndex>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateGreetingIndexDto) {
    const translate =
      await this.langService.translate<CreateTranslateGreetingIndexDto>(
        dto.translate,
      );

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.greetingIndexRepository.save({
      ...dto,
      translate,
    });
  }

  async getAll() {
    return await this.greetingIndexRepository.find();
  }

  async setAllActiveFalse() {
    const data = (
      await this.greetingIndexRepository.findBy({
        is_active: true,
      })
    ).map((item) => ({
      ...item,
      is_active: false,
    }));

    await this.greetingIndexRepository.save(data);
  }

  async findById(id: number) {
    return await this.greetingIndexRepository.findOneBy({
      id,
    });
  }

  async findActive() {
    return await this.greetingIndexRepository.findOneBy({
      is_active: true,
    });
  }

  async update(id: number, dto: UpdateGreetingIndexDto) {
    const translate = await this.langService.translate(dto.translate);

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.greetingIndexRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.greetingIndexRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.greetingIndexRepository.delete(id);
  }
}

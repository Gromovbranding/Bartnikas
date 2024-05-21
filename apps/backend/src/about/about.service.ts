import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateAboutDto,
  CreateTranslateAboutDto,
} from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from './entities/about.entity';
import { Repository } from 'typeorm';
import { LanguageService } from 'src/shared/language/language.service';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private readonly aboutRepository: Repository<About>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateAboutDto) {
    const translate = await this.langService.translate<CreateTranslateAboutDto>(
      dto.translate,
    );

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.aboutRepository.save({
      ...dto,
      translate,
    });
  }

  async getAll() {
    return await this.aboutRepository.find();
  }

  async setAllActiveFalse() {
    const data = (
      await this.aboutRepository.findBy({
        is_active: true,
      })
    ).map((item) => ({
      ...item,
      is_active: false,
    }));

    await this.aboutRepository.save(data);
  }

  async findById(id: number) {
    return await this.aboutRepository.findOneBy({
      id,
    });
  }

  async findActive() {
    return await this.aboutRepository.findOneBy({
      is_active: true,
    });
  }

  async update(id: number, dto: UpdateAboutDto) {
    const translate = await this.langService.translate(dto.translate);

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.aboutRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.aboutRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.aboutRepository.delete(id);
  }
}

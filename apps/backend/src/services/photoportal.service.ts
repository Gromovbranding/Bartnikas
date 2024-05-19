import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';
import { Photoportal } from './entities/photoportal.entity';
import {
  CreatePhotoportalDto,
  CreateTranslatePhotoportalDto,
} from './dto/services.dto';
import { UpdatePhotoportalDto } from './dto/update-services.dto';

@Injectable()
export class PhotoportalService {
  constructor(
    @InjectRepository(Photoportal)
    private readonly photoportalRepository: Repository<Photoportal>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreatePhotoportalDto) {
    const translate =
      await this.langService.translate<CreateTranslatePhotoportalDto>(
        dto.translate,
      );

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.photoportalRepository.save({
      ...dto,
      translate,
    });
  }

  async getAll() {
    return await this.photoportalRepository.find();
  }

  async setAllActiveFalse() {
    const data = (
      await this.photoportalRepository.findBy({
        is_active: true,
      })
    ).map((item) => ({
      ...item,
      is_active: false,
    }));

    await this.photoportalRepository.save(data);
  }

  async findById(id: number) {
    return await this.photoportalRepository.findOneBy({
      id,
    });
  }

  async findActive() {
    return await this.photoportalRepository.findOneBy({
      is_active: true,
    });
  }

  async update(id: number, dto: UpdatePhotoportalDto) {
    const translate = await this.langService.translate(dto.translate);

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.photoportalRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.photoportalRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.photoportalRepository.delete(id);
  }
}

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

    return await this.photoportalRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.photoportalRepository.find();
  }

  async findOne(id: number) {
    return await this.photoportalRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdatePhotoportalDto) {
    const translate = await this.langService.translate(dto.translate);
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

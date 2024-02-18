import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaExhibition } from '../entities/media-exhibition.entity';
import {
  CreateMediaExhibitionDto,
  CreateTranslateMediaExhibitionDto,
} from '../dto/exhibition/create.dto';
import { UpdateMediaExhibitionDto } from '../dto/exhibition/update.dto';
import { LanguageService } from '../../shared/language/language.service';

@Injectable()
export class MediaExhibitionService {
  constructor(
    @InjectRepository(MediaExhibition)
    private readonly mediaExhibitionRepository: Repository<MediaExhibition>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateMediaExhibitionDto) {
    const translate =
      await this.langService.translate<CreateTranslateMediaExhibitionDto>(
        dto.translate,
      );

    return await this.mediaExhibitionRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.mediaExhibitionRepository.find();
  }

  async findOne(id: number) {
    return await this.mediaExhibitionRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateMediaExhibitionDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.mediaExhibitionRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.mediaExhibitionRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.mediaExhibitionRepository.delete(id);
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaPresentation } from '../entities/media-presentation.entity';
import {
  CreateMediaPresentationDto,
  CreateTranslateMediaPresentationDto,
} from '../dto/presentation/create.dto';
import { UpdateMediaPresentationDto } from '../dto/presentation/update.dto';
import { LanguageService } from '../../shared/language/language.service';

@Injectable()
export class MediaPresentationService {
  constructor(
    @InjectRepository(MediaPresentation)
    private readonly mediaPresentationRepository: Repository<MediaPresentation>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateMediaPresentationDto) {
    const translate =
      await this.langService.translate<CreateTranslateMediaPresentationDto>(
        dto.translate,
      );

    return await this.mediaPresentationRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.mediaPresentationRepository.find();
  }

  async findOne(id: number) {
    return await this.mediaPresentationRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateMediaPresentationDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.mediaPresentationRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.mediaPresentationRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.mediaPresentationRepository.delete(id);
  }
}

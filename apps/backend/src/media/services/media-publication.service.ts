import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaPublication } from '../entities/media-publication.entity';
import {
  CreateMediaPublicationDto,
  CreateTranslateMediaPublicationDto,
} from '../dto/publication/create.dto';
import { UpdateMediaPublicationDto } from '../dto/publication/update.dto';
import { LanguageService } from '../../shared/language/language.service';

@Injectable()
export class MediaPublicationService {
  constructor(
    @InjectRepository(MediaPublication)
    private readonly mediaPublicationRepository: Repository<MediaPublication>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateMediaPublicationDto) {
    const translate =
      await this.langService.translate<CreateTranslateMediaPublicationDto>(
        dto.translate,
      );

    return await this.mediaPublicationRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.mediaPublicationRepository.find();
  }

  async findOne(id: number) {
    return await this.mediaPublicationRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateMediaPublicationDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.mediaPublicationRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.mediaPublicationRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.mediaPublicationRepository.delete(id);
  }
}

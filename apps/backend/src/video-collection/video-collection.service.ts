import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateTranslateVideoCollectionDto,
  CreateVideoCollectionDto,
} from './dto/create-video-collection.dto';
import { UpdateVideoCollectionDto } from './dto/update-video-collection.dto';
import { Repository } from 'typeorm';
import { VideoCollection } from './entities/video-collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';

@Injectable()
export class VideoCollectionService {
  constructor(
    @InjectRepository(VideoCollection)
    private readonly videoCollectionRepository: Repository<VideoCollection>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateVideoCollectionDto) {
    const translate =
      await this.langService.translate<CreateTranslateVideoCollectionDto>(
        dto.translate,
      );

    return await this.videoCollectionRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.videoCollectionRepository.find();
  }

  async findOne(id: number) {
    return await this.videoCollectionRepository.findOneBy({
      id,
    });
  }

  async update(id: number, dto: UpdateVideoCollectionDto) {
    const translate = await this.langService.translate(dto.translate);
    return await this.videoCollectionRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.videoCollectionRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.videoCollectionRepository.delete(id);
  }
}

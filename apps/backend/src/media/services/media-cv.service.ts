import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaCV } from '../entities/media-cv.entity';
import { CreateMediaCVDto } from '../dto/cv/create.dto';
import { UpdateMediaCVDto } from '../dto/cv/update.dto';

@Injectable()
export class MediaCVService {
  constructor(
    @InjectRepository(MediaCV)
    private readonly mediaCVRepository: Repository<MediaCV>,
  ) {}

  async create(dto: CreateMediaCVDto) {
    return await this.mediaCVRepository.save(
      this.mediaCVRepository.create(dto),
    );
  }

  async findAll() {
    return await this.mediaCVRepository.find();
  }

  async findOne(id: number) {
    return await this.mediaCVRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateMediaCVDto) {
    return await this.mediaCVRepository.save(
      this.mediaCVRepository.create({
        ...dto,
        id,
      }),
    );
  }

  async remove(id: number) {
    const isExist = await this.mediaCVRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.mediaCVRepository.delete(id);
  }
}

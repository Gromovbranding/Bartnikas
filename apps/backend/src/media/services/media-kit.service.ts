import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaKit } from '../entities/media-kit.entity';
import { CreateMediaKitDto } from '../dto/kit/create.dto';
import { UpdateMediaKitDto } from '../dto/kit/update.dto';

@Injectable()
export class MediaKitService {
  constructor(
    @InjectRepository(MediaKit)
    private readonly mediaKitRepository: Repository<MediaKit>,
  ) {}

  async create(dto: CreateMediaKitDto) {
    return await this.mediaKitRepository.save(
      this.mediaKitRepository.create(dto),
    );
  }

  async findAll() {
    return await this.mediaKitRepository.find();
  }

  async findOne(id: number) {
    return await this.mediaKitRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateMediaKitDto) {
    return await this.mediaKitRepository.save(
      this.mediaKitRepository.create({
        ...dto,
        id,
      }),
    );
  }

  async remove(id: number) {
    const isExist = await this.mediaKitRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.mediaKitRepository.delete(id);
  }
}

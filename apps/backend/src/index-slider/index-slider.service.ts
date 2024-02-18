import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IndexSlider } from './entities/index-slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIndexSliderDto } from './dto/create-index-slider.dto';
import { UpdateIndexSliderDto } from './dto/update-index-slider.dto';

@Injectable()
export class IndexSliderService {
  constructor(
    @InjectRepository(IndexSlider)
    private readonly indexSliderRepository: Repository<IndexSlider>,
  ) {}

  async create(dto: CreateIndexSliderDto) {
    return await this.indexSliderRepository.save(
      this.indexSliderRepository.create(dto),
    );
  }

  async findAll() {
    return await this.indexSliderRepository.find();
  }

  async getSliderImages() {
    return await this.indexSliderRepository.findBy({
      active: true,
    });
  }

  async findById(id: number) {
    return await this.indexSliderRepository.findOneBy({
      id,
    });
  }

  async update(id: number, dto: UpdateIndexSliderDto) {
    return await this.indexSliderRepository.save(
      this.indexSliderRepository.create({
        ...dto,
        id,
      }),
    );
  }

  async remove(id: number) {
    const isExist = await this.indexSliderRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.indexSliderRepository.delete(id);
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateIndexCardFooterDto } from './dto/create-index-card-footer.dto';
import { UpdateIndexCardFooterDto } from './dto/update-index-card-footer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndexCardFooter } from './entities/index-card-footer.entity';

@Injectable()
export class IndexCardFooterService {
  constructor(
    @InjectRepository(IndexCardFooter)
    private readonly indexCardFooterRepository: Repository<IndexCardFooter>,
  ) {}

  async create(dto: CreateIndexCardFooterDto) {
    if (dto.active === true) {
      await this.setAllActiveFalse();
    }

    return await this.indexCardFooterRepository.save(
      this.indexCardFooterRepository.create(dto),
    );
  }

  async findAll() {
    return await this.indexCardFooterRepository.find();
  }

  async findActive() {
    return await this.indexCardFooterRepository.findOneBy({
      active: true,
    });
  }

  async setAllActiveFalse() {
    const data = (
      await this.indexCardFooterRepository.findBy({
        active: true,
      })
    ).map((item) => ({
      ...item,
      active: false,
    }));

    await this.indexCardFooterRepository.save(data);
  }

  async findOne(id: number) {
    return await this.indexCardFooterRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateIndexCardFooterDto) {
    if (dto.active === true) {
      await this.setAllActiveFalse();
    }

    return await this.indexCardFooterRepository.save(
      this.indexCardFooterRepository.create({
        ...dto,
        id,
      }),
    );
  }

  async remove(id: number) {
    const isExist = await this.indexCardFooterRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.indexCardFooterRepository.delete(id);
  }
}

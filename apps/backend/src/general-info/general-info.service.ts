import { Injectable } from '@nestjs/common';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { GeneralInfo } from './entities/general-info.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GeneralInfoService {
  constructor(
    @InjectRepository(GeneralInfo)
    private readonly generalInfoRepository: Repository<GeneralInfo>,
  ) {}

  async create(dto: CreateGeneralInfoDto) {
    return await this.generalInfoRepository.save(
      this.generalInfoRepository.create(dto),
    );
  }

  async findAll() {
    return await this.generalInfoRepository.find();
  }

  async findActive() {
    return await this.generalInfoRepository.findOneBy({
      is_active: true,
    });
  }

  async findOne(id: number) {
    return await this.generalInfoRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateGeneralInfoDto: UpdateGeneralInfoDto) {
    return await this.generalInfoRepository.update(id, updateGeneralInfoDto);
  }

  async remove(id: number) {
    return await this.generalInfoRepository.delete(id);
  }
}

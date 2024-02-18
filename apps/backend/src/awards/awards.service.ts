import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Awards } from './entities/awards.entity';
import { Repository } from 'typeorm';
import {
  CreateAwardsDto,
  CreateTranslateAwardDto,
} from './dto/create-awards.dto';
import { UpdateAwardsDto } from './dto/update-awards.dto';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class AwardsService {
  constructor(
    @InjectRepository(Awards)
    private readonly awardsRepository: Repository<Awards>,
    private readonly langService: LanguageService,
  ) {}

  async createAwards(dto: CreateAwardsDto) {
    const translate = await this.langService.translate<CreateTranslateAwardDto>(
      dto.translate,
    );

    return await this.awardsRepository.save({
      ...dto,
      translate,
    });
  }

  async findAllAwards() {
    return await this.awardsRepository.find();
  }

  async countAllAwards() {
    return await this.awardsRepository.count();
  }

  async findOneAwards(id: number) {
    return await this.awardsRepository.findOne({
      where: { id },
    });
  }

  async updateAwards(id: number, dto: UpdateAwardsDto) {
    const translate = await this.langService.translate(dto.translate);

    return await this.awardsRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async removeAwards(id: number) {
    const isExist = await this.awardsRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.awardsRepository.delete(id);
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';
import { PlaceOfPower } from './entities/place-of-power.entity';
import {
  CreatePlaceOfPowerDto,
  CreateTranslatePlaceOfPowerDto,
} from './dto/services.dto';
import { UpdatePlaceOfPowerDto } from './dto/update-services.dto';

@Injectable()
export class PlaceOfPowerService {
  constructor(
    @InjectRepository(PlaceOfPower)
    private readonly placeOfPowerRepository: Repository<PlaceOfPower>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreatePlaceOfPowerDto) {
    const translate =
      await this.langService.translate<CreateTranslatePlaceOfPowerDto>(
        dto.translate,
      );

    return await this.placeOfPowerRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.placeOfPowerRepository.find();
  }

  async findOne(id: number) {
    return await this.placeOfPowerRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdatePlaceOfPowerDto) {
    const translate = await this.langService.translate(dto.translate);
    return await this.placeOfPowerRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.placeOfPowerRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.placeOfPowerRepository.delete(id);
  }
}

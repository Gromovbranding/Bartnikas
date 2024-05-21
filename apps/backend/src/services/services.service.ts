import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';
import { Services } from './entities/services.entity';
import {
  CreateServicesDto,
  CreateTranslateServicesDto,
} from './dto/services.dto';
import { UpdateServicesDto } from './dto/update-services.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private readonly servicesRepository: Repository<Services>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateServicesDto) {
    const translate =
      await this.langService.translate<CreateTranslateServicesDto>(
        dto.translate,
      );

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.servicesRepository.save({
      ...dto,
      translate,
    });
  }

  async getAll() {
    return await this.servicesRepository.find();
  }

  async setAllActiveFalse() {
    const data = (
      await this.servicesRepository.findBy({
        is_active: true,
      })
    ).map((item) => ({
      ...item,
      is_active: false,
    }));

    await this.servicesRepository.save(data);
  }

  async findById(id: number) {
    return await this.servicesRepository.findOneBy({
      id,
    });
  }

  async findActive() {
    return await this.servicesRepository.findOneBy({
      is_active: true,
    });
  }

  async update(id: number, dto: UpdateServicesDto) {
    const translate = await this.langService.translate(dto.translate);

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.servicesRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.servicesRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.servicesRepository.delete(id);
  }
}

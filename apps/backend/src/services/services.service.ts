import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CreateServicesDto,
  CreateTranslateServicesDto,
} from './dto/services.dto';
import { UpdateServicesDto } from './dto/update-services.dto';
import { Repository } from 'typeorm';
import { Services } from './entities/services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';

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

    return await this.servicesRepository.save({
      ...dto,
      translate,
    });
  }

  async findActive() {
    return await this.servicesRepository.findOneBy({
      is_active: true,
    });
  }

  async findAll() {
    return await this.servicesRepository.find();
  }

  async findOne(id: number) {
    return await this.servicesRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateServicesDto) {
    const translate = await this.langService.translate(dto.translate);
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

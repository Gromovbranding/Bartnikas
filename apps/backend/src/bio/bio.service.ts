import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateBioDto, CreateTranslateBioDto } from './dto/create-bio.dto';
import { UpdateBioDto } from './dto/update-bio.dto';
import { Bio } from './entities/bio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class BioService {
  constructor(
    @InjectRepository(Bio)
    private readonly bioRepository: Repository<Bio>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateBioDto) {
    const translate = await this.langService.translate<CreateTranslateBioDto>(
      dto.translate,
    );

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.bioRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.bioRepository.find();
  }

  async setAllActiveFalse() {
    const data = (
      await this.bioRepository.findBy({
        is_active: true,
      })
    ).map((item) => ({
      ...item,
      is_active: false,
    }));

    await this.bioRepository.save(data);
  }

  async findOne(id: number) {
    return await this.bioRepository.findOne({
      where: { id },
    });
  }

  async findActive() {
    return await this.bioRepository.findOneBy({
      is_active: true,
    });
  }

  async update(id: number, dto: UpdateBioDto) {
    const translate = await this.langService.translate(dto.translate);

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.bioRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.bioRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.bioRepository.delete(id);
  }
}

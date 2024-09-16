import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateFooterContactDto } from './dto/create-footer-contact.dto';
import { UpdateFooterContactDto } from './dto/update-footer-contact.dto';
import { FooterContact } from './entities/footer-contact.entity';
import { LanguageService } from 'src/shared/language/language.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FooterContactsService {
  constructor(
    @InjectRepository(FooterContact)
    private readonly footerContactRepository: Repository<FooterContact>,
    private readonly langService: LanguageService,
  ) {}

  async create(dto: CreateFooterContactDto) {
    if (dto.active === true) {
      await this.setAllActiveFalse();
    }

    const translate = await this.langService.translate(dto.translate);

    return await this.footerContactRepository.save({
      ...dto,
      translate,
    });
  }

  async findAll() {
    return await this.footerContactRepository.find();
  }

  async findActive() {
    return await this.footerContactRepository.findOneBy({
      active: true,
    });
  }

  async setAllActiveFalse() {
    const data = (
      await this.footerContactRepository.findBy({
        active: true,
      })
    ).map((item) => ({
      ...item,
      active: false,
    }));

    await this.footerContactRepository.save(data);
  }

  async findOne(id: number) {
    return await this.footerContactRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateFooterContactDto) {
    if (dto.active === true) {
      await this.setAllActiveFalse();
    }

    const translate = await this.langService.translate(dto.translate);

    return await this.footerContactRepository.save({
      ...dto,
      id,
      translate,
    });
  }

  async remove(id: number) {
    const isExist = await this.footerContactRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.footerContactRepository.delete(id);
  }
}

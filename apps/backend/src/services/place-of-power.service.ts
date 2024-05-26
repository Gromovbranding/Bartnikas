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
import { EmailSender } from 'src/shared/services/email-sender.service';
import { OrderPlaceOfPowerDto } from './dto/order-place-of-power.dto';

@Injectable()
export class PlaceOfPowerService {
  constructor(
    @InjectRepository(PlaceOfPower)
    private readonly placeOfPowerRepository: Repository<PlaceOfPower>,
    private readonly langService: LanguageService,
    private readonly emailSender: EmailSender,
  ) {}

  async create(dto: CreatePlaceOfPowerDto) {
    const translate =
      await this.langService.translate<CreateTranslatePlaceOfPowerDto>(
        dto.translate,
      );

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.placeOfPowerRepository.save({
      ...dto,
      translate,
    });
  }

  async getAll() {
    return await this.placeOfPowerRepository.find();
  }

  async setAllActiveFalse() {
    const data = (
      await this.placeOfPowerRepository.findBy({
        is_active: true,
      })
    ).map((item) => ({
      ...item,
      is_active: false,
    }));

    await this.placeOfPowerRepository.save(data);
  }

  async findById(id: number) {
    return await this.placeOfPowerRepository.findOneBy({
      id,
    });
  }

  async findActive() {
    return await this.placeOfPowerRepository.findOneBy({
      is_active: true,
    });
  }

  async update(id: number, dto: UpdatePlaceOfPowerDto) {
    const translate = await this.langService.translate(dto.translate);

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

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

  async orderByEmail(dto: OrderPlaceOfPowerDto) {
    const template = `
      <p><b> Client name: </b> <span>${dto.name}</span></p>
      <p><b> Client Email: </b> <span>${dto.email}</span></p>
    `;

    const result = await this.emailSender.sendEmailToHome({
      subject: 'Request from Place of Power',
      html: template,
    });

    return !!result;
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateDeliveryStaticDto } from './dto/create-delivery-static.dto';
import { UpdateDeliveryStaticDto } from './dto/update-delivery-static.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryStatic } from './entities/delivery-static.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryStaticService {
  constructor(
    @InjectRepository(DeliveryStatic)
    private readonly deliveryStaticRepository: Repository<DeliveryStatic>,
  ) {}

  async create(dto: CreateDeliveryStaticDto) {
    return await this.deliveryStaticRepository.save(
      this.deliveryStaticRepository.create(dto),
    );
  }

  async findAll() {
    return await this.deliveryStaticRepository.find();
  }

  async findOne(id: number) {
    return await this.deliveryStaticRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateDeliveryStaticDto) {
    return await this.deliveryStaticRepository.save(
      this.deliveryStaticRepository.create({
        ...dto,
        id,
      }),
    );
  }

  async remove(id: number) {
    const isExist = await this.deliveryStaticRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.deliveryStaticRepository.delete(id);
  }
}

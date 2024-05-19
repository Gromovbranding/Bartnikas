import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';
import { Photoportal } from './entities/photoportal.entity';
import { PlaceOfPower } from './entities/place-of-power.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Photoportal)
    private readonly photoportalRepository: Repository<Photoportal>,
    @InjectRepository(PlaceOfPower)
    private readonly placeOfPowerRepository: Repository<PlaceOfPower>,
    private readonly langService: LanguageService,
  ) {}
}

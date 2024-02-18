import { Injectable } from '@nestjs/common';
import { Contacts } from './entities/contacts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactRepository: Repository<Contacts>,
  ) {}

  async findAll() {
    return await this.contactRepository.find();
  }

  async create(dto: CreateContactDto) {
    return await this.contactRepository.save(
      this.contactRepository.create(dto),
    );
  }

  async delete(id: number) {
    return await this.contactRepository.delete(id);
  }

  async findByEmail(email: string) {
    return await this.contactRepository.find({
      where: { email },
    });
  }

  async findById(id: number) {
    return await this.contactRepository.findOne({
      where: { id },
    });
  }
}

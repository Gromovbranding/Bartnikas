import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOne(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async create(username: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return await this.usersRepository.save({ username, password: hash });
  }

  async seed() {
    const username = this.configService.get<string>('ADMIN_LOGIN');
    const password = this.configService.get<string>('ADMIN_PASSWORD');

    const similar = await this.findOne(username);

    if (!similar) {
      await this.create(username, password);
    }
  }
}

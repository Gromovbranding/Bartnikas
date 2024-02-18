import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    const errTextIncorrect = 'Login/password incorrect';

    if (!user) {
      throw new BadRequestException(errTextIncorrect);
    }

    const isPassCompare = await bcrypt.compare(password, user.password);

    if (!isPassCompare) {
      throw new BadRequestException(errTextIncorrect);
    }

    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
        sub: user.id,
      }),
    };
  }

  async create(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const similar = await this.usersService.findOne(username);

    if (similar) {
      throw new BadRequestException('User exists');
    }

    await this.usersService.create(username, password);

    return await this.signIn(username, password);
  }
}

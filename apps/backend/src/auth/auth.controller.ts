import { Controller, Post, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './constants';
import { User } from '../users/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

class AccessToken {
  @ApiProperty()
  access_token: string;
}

class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

@ApiTags('Admin Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: AccessToken,
  })
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOkResponse({
    type: User,
  })
  @ApiBearerAuth()
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  // @ApiCreatedResponse({
  //   type: AccessToken,
  // })
  // @ApiBearerAuth()
  // @Post('create')
  // create(@Body() signUpDto: SignInDto) {
  //   return this.authService.create(signUpDto.username, signUpDto.password);
  // }
}

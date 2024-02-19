import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailSender {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailToHome(dto: Omit<ISendMailOptions, 'to'>) {
    return await this.mailerService.sendMail({
      ...dto,
      from: this.configService.get('EMAIL_FROM'),
      to: this.configService.get('EMAIL_TO'),
    });
  }
}

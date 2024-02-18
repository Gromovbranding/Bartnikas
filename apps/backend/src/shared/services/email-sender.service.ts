import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSender {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailToHome(dto: Omit<ISendMailOptions, 'to'>) {
    return await this.mailerService.sendMail({
      ...dto,
      from: 'love@stanislavbartnikas.com',
      to: 'sb@stasbart.com',
    });
  }
}

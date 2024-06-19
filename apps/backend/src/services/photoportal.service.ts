import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/shared/language/language.service';
import { Photoportal } from './entities/photoportal.entity';
import {
  CreatePhotoportalDto,
  CreateTranslatePhotoportalDto,
} from './dto/services.dto';
import { UpdatePhotoportalDto } from './dto/update-services.dto';
import { OrderPhotoportalDto, PaymentType } from './dto/order-photoportal.dto';
import { PaymentsService } from 'src/shared/services/payments.service';
import Stripe from 'stripe';
import { PaymentStatuses } from 'src/shared/enum/payment-statuses.enum';
import { PhotoportalOrder } from './entities/photoportal-order.entity';
import { EmailSender } from 'src/shared/services/email-sender.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotoportalService {
  constructor(
    @InjectRepository(Photoportal)
    private readonly photoportalRepository: Repository<Photoportal>,
    @InjectRepository(PhotoportalOrder)
    private readonly photoportalOrderRepository: Repository<PhotoportalOrder>,
    private readonly langService: LanguageService,
    private readonly configService: ConfigService,
    private readonly paymentsService: PaymentsService,
    private readonly emailSender: EmailSender,
  ) {}

  async create(dto: CreatePhotoportalDto) {
    const translate =
      await this.langService.translate<CreateTranslatePhotoportalDto>(
        dto.translate,
      );

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.photoportalRepository.save({
      ...dto,
      translate,
    });
  }

  async getAll() {
    return await this.photoportalRepository.find();
  }

  async setAllActiveFalse() {
    const data = (
      await this.photoportalRepository.findBy({
        is_active: true,
      })
    ).map((item) => ({
      ...item,
      is_active: false,
    }));

    await this.photoportalRepository.save(data);
  }

  async findById(id: number) {
    return await this.photoportalRepository.findOneBy({
      id,
    });
  }

  async findActive() {
    return await this.photoportalRepository.findOneBy({
      is_active: true,
    });
  }

  async update(id: number, dto: UpdatePhotoportalDto) {
    const translate = await this.langService.translate(dto.translate);

    if (dto.is_active === true) {
      await this.setAllActiveFalse();
    }

    return await this.photoportalRepository.save({ ...dto, id, translate });
  }

  async remove(id: number) {
    const isExist = await this.photoportalRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.photoportalRepository.delete(id);
  }

  async orderByEmail(payment: PhotoportalOrder) {
    const template = `
      <p><b> Client name: </b> <span>${payment.name}</span></p>
      <p><b> Client Email: </b> <span>${payment.email}</span></p>
      <p><b> Client phone: </b> <span>${payment.phone}</span></p>
      <p><b> Client address: </b> <span>${payment.address}</span></p>
      <p><b> Get total: </b> <span>${payment.actually_paid} ${payment.currency}</span></p>
    `;

    const result = await this.emailSender.sendEmailToHome({
      subject: 'Paid photoportal',
      html: template,
    });

    return !!result;
  }

  async updateRobokassaPayment(dto: {
    invoice_id: string;
    status: PaymentStatuses;
    actually_paid: string;
  }) {
    await this.photoportalOrderRepository.update(
      {
        invoice_id: dto.invoice_id,
      },
      {
        status: dto.status,
        actually_paid: dto.actually_paid,
      },
    );

    const updatedOrder = await this.photoportalOrderRepository.findOneBy({
      invoice_id: dto.invoice_id,
    });

    await this.orderByEmail(updatedOrder);
  }

  async getStripeData(invoiceId: string) {
    return await this.photoportalOrderRepository.findOne({
      where: {
        invoice_id: invoiceId,
      },
    });
  }

  async updateStripePayment(body: any, stripeSignature?: string) {
    try {
      const event = this.paymentsService.validateSignatureStripe(
        stripeSignature,
        body,
        this.configService.get('STRIPE_API_KEY_IPN'),
      );

      console.log(event);
      if (
        !!~event.type.indexOf('payment_intent') &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'payment_intent.created' !== event.data.object?.status
      ) {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        let status: PaymentStatuses;

        if (paymentIntent.status === 'canceled') {
          status = PaymentStatuses.Failed;
        } else if (paymentIntent.status === 'processing') {
          status = PaymentStatuses.Confirming;
        } else if (paymentIntent.status === 'succeeded') {
          status = PaymentStatuses.Finished;
        } else if (
          [
            'requires_action',
            'requires_capture',
            'requires_confirmation',
            'requires_payment_method',
          ].includes(paymentIntent.status)
        ) {
          status = PaymentStatuses.Waiting;
        }

        await this.photoportalOrderRepository.update(
          {
            invoice_id: paymentIntent.id,
          },
          {
            status: status,
            actually_paid: String(paymentIntent.amount_received),
          },
        );

        const updatedOrder = await this.photoportalOrderRepository.findOneBy({
          invoice_id: paymentIntent.id,
        });

        const isSent = await this.orderByEmail(updatedOrder);

        console.log(isSent);
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Webhook Error');
    }
  }

  async createPayment(dto: OrderPhotoportalDto) {
    if (dto.type === PaymentType.Stripe) {
      const responseStripe = await this.paymentsService.createPaymentStripe({
        // add * 100 for 888.00, for 00, idk why that work
        // without * 100 will equal 8.00 price
        amount: 888 * 100,
        currency: 'eur',
      });

      await this.photoportalOrderRepository.save({
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
        email: dto.email,
        uuid: responseStripe.client_secret,
        amount: '1',
        currency: 'eur',
        invoice_id: responseStripe.id,
      });

      return {
        invoiceId: responseStripe.id,
        type: dto.type,
      };
    } else if (dto.type === PaymentType.Robokassa) {
      const payment = this.paymentsService.createRobokassaPayment({
        amount: 100,
        description: 'Purchase photoportal',
      });

      await this.photoportalOrderRepository.save({
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
        email: dto.email,
        uuid: payment.uuid,
        amount: '88888',
        currency: 'rub',
        invoice_id: payment.uuid,
      });

      return {
        url: payment.url,
        type: dto.type,
      };
    }
  }
}

import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { OrderByPaymentDto } from '../dto/order-by-payment.dto';
import * as util from 'util';
import * as crypto from 'crypto';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class PaymentsService {
  readonly #stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.#stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  validateSignatureStripe(
    stripeSignature: string,
    params: any,
    keyIpn: string,
  ) {
    return this.#stripe.webhooks.constructEvent(
      params,
      stripeSignature,
      keyIpn,
    );
  }

  createRobokassaPayment(dto: { amount: number; description?: string }) {
    const paymentUUID = new ShortUniqueId({ length: 14 }).randomUUID();

    const signature = this.#signRobokassa([
      this.configService.get('PAYMENT_ROBOKASSA_MERCHANT'),
      dto.amount.toString(),
      '',
      this.configService.get('PAYMENT_ROBOKASSA_PASSWORD'),
      `Shp_uuid=${paymentUUID}`,
    ]);

    const data = {
      MerchantLogin: this.configService.get('PAYMENT_ROBOKASSA_MERCHANT'),
      OutSum: dto.amount.toString(),
      Shp_uuid: paymentUUID,
      Description: dto.description ?? '',
      SignatureValue: signature,
      IsTest: String(false),
    };

    return {
      uuid: paymentUUID,
      url: `${this.configService.get('PAYMENT_ROBOKASSA_URL')}?${new URLSearchParams(data).toString()}`,
    };
  }

  verifySignatureRobokassa(data: any) {
    if (!data.SignatureValue) {
      return false;
    }

    const signature = this.#signRobokassa([
      data.OutSum,
      data.InvId,
      this.configService.get('PAYMENT_ROBOKASSA_PASSWORD2'),
      `Shp_uuid=${data.Shp_uuid}`,
    ]);

    return signature === data.SignatureValue;
  }

  #signRobokassa(data: string[]): string {
    return crypto.createHash('md5').update(data.join(':')).digest('hex');
  }

  async createPaymentStripe(dto: OrderByPaymentDto) {
    try {
      return await this.#stripe.paymentIntents.create({
        amount: dto.amount,
        currency: dto.currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });
    } catch (error) {
      Logger.error(
        '[stripeService] Error creating a payment intent',
        util.inspect(error),
      );
      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }
  }
}

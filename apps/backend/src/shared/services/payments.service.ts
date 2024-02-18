import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { OrderByPaymentDto } from '../dto/order-by-payment.dto';
import * as util from 'util';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(
      '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',
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async createPayment(dto: OrderByPaymentDto) {
    try {
      return (
        await this.stripe.paymentIntents.create({
          amount: dto.amount,
          currency: dto.currency,
          automatic_payment_methods: {
            enabled: true,
          },
        })
      ).client_secret;
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

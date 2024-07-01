import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhotoportalService } from './photoportal.service';
import { Photoportal } from './entities/photoportal.entity';
import { Public } from 'src/auth/constants';
import { DeleteAnyResponseDto } from 'src/shared/dto/delete-any-response.dto';
import { CreatePhotoportalDto } from './dto/services.dto';
import { UpdatePhotoportalDto } from './dto/update-services.dto';
import { OrderPhotoportalDto } from './dto/order-photoportal.dto';
import { PaymentsService } from 'src/shared/services/payments.service';
import { PaymentStatuses } from 'src/shared/enum/payment-statuses.enum';

@ApiTags('Services Photoportal')
@Controller('photoportal')
export class PhotoportalController {
  constructor(
    private readonly photoportalService: PhotoportalService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @ApiCreatedResponse({
    type: Photoportal,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreatePhotoportalDto) {
    return this.photoportalService.create(createFaqDto);
  }

  @ApiOkResponse({
    type: [Photoportal],
  })
  @Public()
  @Get()
  findAll() {
    return this.photoportalService.getAll();
  }

  @ApiOkResponse({
    type: Photoportal,
  })
  @Public()
  @Get('/only/active')
  findActive() {
    return this.photoportalService.findActive();
  }

  @ApiOkResponse({
    type: Photoportal,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoportalService.findById(+id);
  }

  @ApiCreatedResponse({
    type: Photoportal,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdatePhotoportalDto) {
    return this.photoportalService.update(+id, updateFaqDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoportalService.remove(+id);
  }

  @ApiOkResponse()
  @Public()
  @Post('/request/order')
  orderPlaceOfPower(@Body() dto: OrderPhotoportalDto) {
    return this.photoportalService.createPayment(dto);
  }

  @ApiOkResponse({
    description: 'Update payment data',
  })
  @Public()
  @Post('robokassa/ipn')
  async updateRobokassaPayment(@Body() body: any) {
    if (this.paymentsService.verifySignatureRobokassa(body)) {
      const { Shp_uuid } = body as { Shp_uuid: string };

      await this.photoportalService.updateRobokassaPayment({
        invoice_id: String(Shp_uuid),
        status: PaymentStatuses.Finished,
        actually_paid: '88888',
      });

      return `OK${body.InvId}`;
    }

    return false;
  }

  @Public()
  @Get('/stripe/get/:order_id')
  async getDataStripe(@Param('order_id') id: string) {
    return await this.photoportalService.getStripeData(id);
  }

  @Public()
  @Post('stripe/ipn')
  async stripeIpn(
    @Headers('stripe-signature') signature: string | undefined,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException('No signature');
    }

    await this.photoportalService.updateStripePayment(
      req.rawBody,
      signature.toString().trim(),
    );

    return true;
  }
}

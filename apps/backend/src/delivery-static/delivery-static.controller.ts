import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveryStaticService } from './delivery-static.service';
import { CreateDeliveryStaticDto } from './dto/create-delivery-static.dto';
import { UpdateDeliveryStaticDto } from './dto/update-delivery-static.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/constants';
import { DeliveryStatic } from './entities/delivery-static.entity';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Delivery page accordions')
@Controller('delivery-static')
export class DeliveryStaticController {
  constructor(private readonly deliveryStaticService: DeliveryStaticService) {}

  @ApiCreatedResponse({
    type: DeliveryStatic,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreateDeliveryStaticDto) {
    return this.deliveryStaticService.create(createFaqDto);
  }

  @ApiOkResponse({
    type: [DeliveryStatic],
  })
  @Public()
  @Get()
  findAll() {
    return this.deliveryStaticService.findAll();
  }

  @ApiOkResponse({
    type: DeliveryStatic,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryStaticService.findOne(+id);
  }

  @ApiCreatedResponse({
    type: DeliveryStatic,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateDeliveryStaticDto,
  ) {
    return this.deliveryStaticService.update(+id, updateFaqDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryStaticService.remove(+id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePlaceOfPowerDto } from './dto/services.dto';
import { PlaceOfPowerService } from './place-of-power.service';
import { Public } from 'src/auth/constants';
import { DeleteAnyResponseDto } from 'src/shared/dto/delete-any-response.dto';
import { UpdatePlaceOfPowerDto } from './dto/update-services.dto';
import { PlaceOfPower } from './entities/place-of-power.entity';
import { OrderPlaceOfPowerDto } from './dto/order-place-of-power.dto';

@ApiTags('Place of power')
@Controller('place-of-power')
export class PlaceOfPowerController {
  constructor(private readonly placeOfPowerService: PlaceOfPowerService) {}

  @ApiCreatedResponse({
    type: PlaceOfPower,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreatePlaceOfPowerDto) {
    return this.placeOfPowerService.create(createFaqDto);
  }

  @ApiOkResponse({
    type: [PlaceOfPower],
  })
  @Public()
  @Get()
  findAll() {
    return this.placeOfPowerService.getAll();
  }

  @ApiOkResponse({
    type: PlaceOfPower,
  })
  @Public()
  @Get('/only/active')
  findActive() {
    return this.placeOfPowerService.findActive();
  }

  @ApiOkResponse({
    type: PlaceOfPower,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeOfPowerService.findById(+id);
  }

  @ApiCreatedResponse({
    type: PlaceOfPower,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdatePlaceOfPowerDto) {
    return this.placeOfPowerService.update(+id, updateFaqDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeOfPowerService.remove(+id);
  }

  @ApiOkResponse()
  @Public()
  @Post('/request/order')
  orderPlaceOfPower(@Body() dto: OrderPlaceOfPowerDto) {
    return this.placeOfPowerService.orderByEmail(dto);
  }
}

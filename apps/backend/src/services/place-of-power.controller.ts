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

@ApiTags('Place of power')
@Controller('services/place-of-power')
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
    return this.placeOfPowerService.findAll();
  }

  @ApiOkResponse({
    type: PlaceOfPower,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeOfPowerService.findOne(+id);
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
}

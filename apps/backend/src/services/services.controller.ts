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
import { CreateServicesDto } from './dto/services.dto';
import { ServicesService } from './services.service';
import { Public } from 'src/auth/constants';
import { DeleteAnyResponseDto } from 'src/shared/dto/delete-any-response.dto';
import { UpdateServicesDto } from './dto/update-services.dto';
import { Services } from './entities/services.entity';

@ApiTags('Place of power')
@Controller('services/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiCreatedResponse({
    type: Services,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createServicesDto: CreateServicesDto) {
    return this.servicesService.create(createServicesDto);
  }

  @ApiOkResponse({
    type: [Services],
  })
  @Public()
  @Get()
  findAll() {
    return this.servicesService.getAll();
  }

  @ApiOkResponse({
    type: Services,
  })
  @Public()
  @Get('/only/active')
  findActive() {
    return this.servicesService.findActive();
  }

  @ApiOkResponse({
    type: Services,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findById(+id);
  }

  @ApiCreatedResponse({
    type: Services,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateServicesDto) {
    return this.servicesService.update(+id, updateFaqDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}

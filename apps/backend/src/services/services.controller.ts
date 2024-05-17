import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServicesDto } from './dto/services.dto';
import { UpdateServicesDto } from './dto/update-services.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteAnyResponseDto } from 'src/shared/dto/delete-any-response.dto';
import { Services } from './entities/services.entity';
import { Public } from 'src/auth/constants';

@ApiTags('Terms page accordions')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiCreatedResponse({
    type: Services,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreateServicesDto) {
    return this.servicesService.create(createFaqDto);
  }

  @Public()
  @Get('/only/active')
  findActive() {
    return this.servicesService.findActive();
  }

  @ApiOkResponse({
    type: [Services],
  })
  @Public()
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiOkResponse({
    type: Services,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
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

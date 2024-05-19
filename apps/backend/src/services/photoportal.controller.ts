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
import { PhotoportalService } from './photoportal.service';
import { Photoportal } from './entities/photoportal.entity';
import { Public } from 'src/auth/constants';
import { DeleteAnyResponseDto } from 'src/shared/dto/delete-any-response.dto';
import { CreatePhotoportalDto } from './dto/services.dto';
import { UpdatePhotoportalDto } from './dto/update-services.dto';

@ApiTags('Services Photoportal')
@Controller('services/photoportal')
export class PhotoportalController {
  constructor(private readonly photoportalService: PhotoportalService) {}

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
}

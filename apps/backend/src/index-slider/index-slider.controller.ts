import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IndexSliderService } from './index-slider.service';
import { CreateIndexSliderDto } from './dto/create-index-slider.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IndexSlider } from './entities/index-slider.entity';
import { Public } from '../auth/constants';
import { UpdateIndexSliderDto } from './dto/update-index-slider.dto';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Slider on index page')
@Controller('index-slider')
export class IndexSliderController {
  constructor(private readonly indexSliderService: IndexSliderService) {}

  @ApiCreatedResponse({
    type: IndexSlider,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateIndexSliderDto) {
    return this.indexSliderService.create(dto);
  }

  @ApiOkResponse({
    type: [IndexSlider],
  })
  @Public()
  @Get()
  getAll() {
    return this.indexSliderService.findAll();
  }

  @ApiOkResponse({
    type: IndexSlider,
  })
  @Public()
  @Get('only/active')
  findImage() {
    return this.indexSliderService.getSliderImages();
  }

  @ApiOkResponse({
    type: IndexSlider,
  })
  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.indexSliderService.findById(+id);
  }

  @ApiOkResponse({
    type: IndexSlider,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIndexSliderDto) {
    return this.indexSliderService.update(+id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indexSliderService.remove(+id);
  }
}

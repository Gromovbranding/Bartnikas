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
import { Awards } from './entities/awards.entity';
import { CreateAwardsDto } from './dto/create-awards.dto';
import { AwardsService } from './awards.service';
import { Public } from '../auth/constants';
import { UpdateAwardsDto } from './dto/update-awards.dto';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Awards')
@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @ApiCreatedResponse({
    type: Awards,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateAwardsDto) {
    return this.awardsService.createAwards(dto);
  }

  @ApiOkResponse({
    type: [Awards],
  })
  @Public()
  @Get()
  findAll() {
    return this.awardsService.findAllAwards();
  }

  @ApiOkResponse({
    type: Number,
  })
  @Public()
  @Get('count/all')
  countAllAwards() {
    return this.awardsService.countAllAwards();
  }

  @ApiOkResponse({
    type: Awards,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.awardsService.findOneAwards(id);
  }

  @ApiOkResponse({
    type: Awards,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAwardsDto) {
    return this.awardsService.updateAwards(id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.awardsService.removeAwards(id);
  }
}

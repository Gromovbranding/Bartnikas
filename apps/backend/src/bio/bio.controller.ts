import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BioService } from './bio.service';
import { CreateBioDto } from './dto/create-bio.dto';
import { UpdateBioDto } from './dto/update-bio.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Bio } from './entities/bio.entity';
import { Public } from 'src/auth/constants';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Bio about Bartnikas')
@Controller('bio')
export class BioController {
  constructor(private readonly bioService: BioService) {}

  @ApiCreatedResponse({
    type: Bio,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreateBioDto) {
    return this.bioService.create(createFaqDto);
  }

  @ApiOkResponse({
    type: [Bio],
  })
  @Public()
  @Get()
  findAll() {
    return this.bioService.findAll();
  }

  @ApiOkResponse({
    type: Bio,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bioService.findOne(+id);
  }

  @ApiOkResponse({
    type: Bio,
  })
  @Public()
  @Get('/current/active')
  findActive() {
    return this.bioService.findActive();
  }

  @ApiCreatedResponse({
    type: Bio,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateBioDto) {
    return this.bioService.update(+id, updateFaqDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bioService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { About } from './entities/about.entity';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';
import { Public } from '../auth/constants';

@ApiTags('About page')
@Controller('about')
export class AboutController {
  constructor(private readonly greetingIndexService: AboutService) {}

  @ApiCreatedResponse({
    type: About,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.greetingIndexService.create(createAboutDto);
  }

  @ApiOkResponse({
    type: About,
  })
  @Public()
  @Get()
  getAll() {
    return this.greetingIndexService.getAll();
  }

  @ApiOkResponse({
    type: About,
  })
  @Public()
  @Get('/only/active')
  findActive() {
    return this.greetingIndexService.findActive();
  }

  @ApiOkResponse({
    type: About,
  })
  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.greetingIndexService.findById(+id);
  }

  @ApiOkResponse({
    type: About,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto) {
    return this.greetingIndexService.update(+id, updateAboutDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.greetingIndexService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GreetingIndexService } from './greeting-index.service';
import { CreateGreetingIndexDto } from './dto/create-greeting-index.dto';
import { UpdateGreetingIndexDto } from './dto/update-greeting-index.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GreetingIndex } from './entities/greeting-index.entity';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';
import { Public } from '../auth/constants';

@ApiTags('Greeting block on index page')
@Controller('greeting-index')
export class GreetingIndexController {
  constructor(private readonly greetingIndexService: GreetingIndexService) {}

  @ApiCreatedResponse({
    type: GreetingIndex,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createGreetingIndexDto: CreateGreetingIndexDto) {
    return this.greetingIndexService.create(createGreetingIndexDto);
  }

  @ApiOkResponse({
    type: GreetingIndex,
  })
  @Public()
  @Get()
  getAll() {
    return this.greetingIndexService.getAll();
  }

  @ApiOkResponse({
    type: GreetingIndex,
  })
  @Public()
  @Get('/only/active')
  findActive() {
    return this.greetingIndexService.findActive();
  }

  @ApiOkResponse({
    type: GreetingIndex,
  })
  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.greetingIndexService.findById(+id);
  }

  @ApiOkResponse({
    type: GreetingIndex,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGreetingIndexDto: UpdateGreetingIndexDto,
  ) {
    return this.greetingIndexService.update(+id, updateGreetingIndexDto);
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

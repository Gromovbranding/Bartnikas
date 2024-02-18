import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IndexCardFooterService } from './index-card-footer.service';
import { CreateIndexCardFooterDto } from './dto/create-index-card-footer.dto';
import { UpdateIndexCardFooterDto } from './dto/update-index-card-footer.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/constants';
import { IndexCardFooter } from './entities/index-card-footer.entity';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Footer card index')
@Controller('index-card-footer')
export class IndexCardFooterController {
  constructor(
    private readonly indexCardFooterService: IndexCardFooterService,
  ) {}

  @ApiCreatedResponse({
    type: IndexCardFooter,
  })
  @Public()
  @Post()
  create(@Body() createIndexCardFooterDto: CreateIndexCardFooterDto) {
    return this.indexCardFooterService.create(createIndexCardFooterDto);
  }

  @ApiOkResponse({
    type: [IndexCardFooter],
  })
  @Public()
  @Get()
  findAll() {
    return this.indexCardFooterService.findAll();
  }

  @ApiOkResponse({
    type: IndexCardFooter,
  })
  @Public()
  @Get('/only/active')
  findActive() {
    return this.indexCardFooterService.findActive();
  }

  @ApiOkResponse({
    type: IndexCardFooter,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indexCardFooterService.findOne(+id);
  }

  @ApiOkResponse({
    type: IndexCardFooter,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndexCardFooterDto: UpdateIndexCardFooterDto,
  ) {
    return this.indexCardFooterService.update(+id, updateIndexCardFooterDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indexCardFooterService.remove(+id);
  }
}

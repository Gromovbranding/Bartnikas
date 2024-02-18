import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { News } from './entities/news.entity';
import { Public } from '../auth/constants';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiCreatedResponse({
    type: News,
  })
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateNewsDto) {
    return await this.newsService.create(dto);
  }

  @ApiOkResponse({
    type: [News],
  })
  @Public()
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @ApiOkResponse({
    type: News,
  })
  @Public()
  @Get('prev-next/:id')
  findOne(@Param('id') id: number) {
    return this.newsService.findOneWithPrevNext(id);
  }

  @ApiOkResponse({
    type: News,
  })
  @Public()
  @Get(':id')
  findOneWithPrevNext(@Param('id') id: number) {
    return this.newsService.findWithoutNextPrev(id);
  }

  @ApiOkResponse({
    type: [News],
  })
  @Public()
  @Get('/hot/all')
  findHotNews() {
    return this.newsService.findHotNews();
  }

  @ApiOkResponse({
    type: News,
  })
  @Public()
  @Get('/hot/last')
  findHotArticle() {
    return this.newsService.findHotOneArticle();
  }

  @ApiOkResponse({
    type: News,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newsService.remove(id);
  }
}

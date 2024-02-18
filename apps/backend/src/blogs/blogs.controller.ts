import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { Public } from '../auth/constants';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiCreatedResponse({
    type: Blog,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateBlogDto) {
    return this.blogsService.create(dto);
  }

  @ApiOkResponse({
    type: [Blog],
  })
  @Public()
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @ApiOkResponse({
    type: Blog,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogsService.findOne(id);
  }

  @ApiOkResponse({
    type: Blog,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBlogDto) {
    return this.blogsService.update(id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogsService.remove(id);
  }
}

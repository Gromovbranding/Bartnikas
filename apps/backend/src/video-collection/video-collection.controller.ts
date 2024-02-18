import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideoCollectionService } from './video-collection.service';
import { CreateVideoCollectionDto } from './dto/create-video-collection.dto';
import { UpdateVideoCollectionDto } from './dto/update-video-collection.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VideoCollection } from './entities/video-collection.entity';
import { Public } from '../auth/constants';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Video Collection')
@Controller('video-collection')
export class VideoCollectionController {
  constructor(
    private readonly videoCollectionService: VideoCollectionService,
  ) {}

  @ApiCreatedResponse({
    type: VideoCollection,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateVideoCollectionDto) {
    return this.videoCollectionService.create(dto);
  }

  @ApiOkResponse({
    type: [VideoCollection],
  })
  @Public()
  @Get()
  findAll() {
    return this.videoCollectionService.findAll();
  }

  @ApiOkResponse({
    type: VideoCollection,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoCollectionService.findOne(+id);
  }

  @ApiOkResponse({
    type: VideoCollection,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoCollectionDto) {
    return this.videoCollectionService.update(+id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoCollectionService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { MediaKitService } from './services/media-kit.service';
import { CreateMediaKitDto } from './dto/kit/create.dto';
import { UpdateMediaKitDto } from './dto/kit/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MediaKit } from './entities/media-kit.entity';
import { Public } from '../auth/constants';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';
import { MediaPresentation } from './entities/media-presentation.entity';
import { CreateMediaPresentationDto } from './dto/presentation/create.dto';
import { MediaPresentationService } from './services/media-presentation.service';
import { UpdateMediaPresentationDto } from './dto/presentation/update.dto';
import { MediaPublicationService } from './services/media-publication.service';
import { MediaPublication } from './entities/media-publication.entity';
import { CreateMediaPublicationDto } from './dto/publication/create.dto';
import { UpdateMediaPublicationDto } from './dto/publication/update.dto';
import { MediaExhibitionService } from './services/media-exhibition.service';
import { MediaExhibition } from './entities/media-exhibition.entity';
import { CreateMediaExhibitionDto } from './dto/exhibition/create.dto';
import { UpdateMediaExhibitionDto } from './dto/exhibition/update.dto';
import { MediaCVService } from './services/media-cv.service';
import { MediaCV } from './entities/media-cv.entity';
import { CreateMediaCVDto } from './dto/cv/create.dto';
import { UpdateMediaCVDto } from './dto/cv/update.dto';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaKitService: MediaKitService,
    private readonly mediaPresentationService: MediaPresentationService,
    private readonly mediaPublicationService: MediaPublicationService,
    private readonly mediaExhibitionService: MediaExhibitionService,
    private readonly mediaCVService: MediaCVService,
  ) {}

  // Media Kit
  @ApiCreatedResponse({
    type: MediaKit,
  })
  @ApiBearerAuth()
  @Post('kit')
  createKit(@Body() dto: CreateMediaKitDto) {
    return this.mediaKitService.create(dto);
  }

  @ApiOkResponse({
    type: [MediaKit],
  })
  @Public()
  @Get('kit')
  findAllKit() {
    return this.mediaKitService.findAll();
  }

  @ApiOkResponse({
    type: MediaKit,
  })
  @Public()
  @Get('kit/:id')
  findOneKit(@Param('id') id: number) {
    return this.mediaKitService.findOne(+id);
  }

  @ApiOkResponse({
    type: MediaKit,
  })
  @ApiBearerAuth()
  @Patch('kit/:id')
  updateKit(@Param('id') id: string, @Body() dto: UpdateMediaKitDto) {
    return this.mediaKitService.update(+id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete('kit/:id')
  removeKit(@Param('id') id: string) {
    return this.mediaKitService.remove(+id);
  }

  // Media Presentation
  @ApiCreatedResponse({
    type: MediaPresentation,
  })
  @ApiBearerAuth()
  @Post('presentation')
  createPresentation(@Body() dto: CreateMediaPresentationDto) {
    return this.mediaPresentationService.create(dto);
  }

  @ApiOkResponse({
    type: [MediaPresentation],
  })
  @Public()
  @Get('presentation')
  findAllPresentation() {
    return this.mediaPresentationService.findAll();
  }

  @ApiOkResponse({
    type: MediaPresentation,
  })
  @Public()
  @Get('presentation/:id')
  findOnePresentation(@Param('id') id: number) {
    return this.mediaPresentationService.findOne(+id);
  }

  @ApiOkResponse({
    type: MediaPresentation,
  })
  @ApiBearerAuth()
  @Patch('presentation/:id')
  updatePresentation(
    @Param('id') id: string,
    @Body() dto: UpdateMediaPresentationDto,
  ) {
    return this.mediaPresentationService.update(+id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete('presentation/:id')
  removePresentation(@Param('id') id: string) {
    return this.mediaPresentationService.remove(+id);
  }

  // Media Publication
  @ApiCreatedResponse({
    type: MediaPublication,
  })
  @ApiBearerAuth()
  @Post('publication')
  createPublication(@Body() dto: CreateMediaPublicationDto) {
    return this.mediaPublicationService.create(dto);
  }

  @ApiOkResponse({
    type: [MediaPublication],
  })
  @Public()
  @Get('publication')
  findAllPublication() {
    return this.mediaPublicationService.findAll();
  }

  @ApiOkResponse({
    type: MediaPublication,
  })
  @Public()
  @Get('publication/:id')
  findOnePublication(@Param('id') id: number) {
    return this.mediaPublicationService.findOne(+id);
  }

  @ApiOkResponse({
    type: MediaPublication,
  })
  @ApiBearerAuth()
  @Patch('publication/:id')
  updatePublication(
    @Param('id') id: string,
    @Body() dto: UpdateMediaPublicationDto,
  ) {
    return this.mediaPublicationService.update(+id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete('publication/:id')
  removePublication(@Param('id') id: string) {
    return this.mediaPublicationService.remove(+id);
  }

  // Media Exhibition
  @ApiCreatedResponse({
    type: MediaExhibition,
  })
  @ApiBearerAuth()
  @Post('exhibition')
  createExhibition(@Body() dto: CreateMediaExhibitionDto) {
    return this.mediaExhibitionService.create(dto);
  }

  @ApiOkResponse({
    type: [MediaExhibition],
  })
  @Public()
  @Get('exhibition')
  findAllExhibition() {
    return this.mediaExhibitionService.findAll();
  }

  @ApiOkResponse({
    type: MediaExhibition,
  })
  @Get('exhibition/:id')
  findOneExhibition(@Param('id') id: string) {
    return this.mediaExhibitionService.findOne(+id);
  }

  @ApiOkResponse({
    type: MediaExhibition,
  })
  @ApiBearerAuth()
  @Patch('exhibition/:id')
  updateExhibition(
    @Param('id') id: string,
    @Body() dto: UpdateMediaExhibitionDto,
  ) {
    return this.mediaExhibitionService.update(+id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete('exhibition/:id')
  removeExhibition(@Param('id') id: string) {
    return this.mediaExhibitionService.remove(+id);
  }

  // Media CV
  @ApiCreatedResponse({
    type: MediaCV,
  })
  @ApiBearerAuth()
  @Post('cv')
  createCV(@Body() dto: CreateMediaCVDto) {
    return this.mediaCVService.create(dto);
  }

  @ApiOkResponse({
    type: [MediaCV],
  })
  @Public()
  @Get('cv')
  findAllCV() {
    return this.mediaCVService.findAll();
  }

  @ApiOkResponse({
    type: MediaCV,
  })
  @Public()
  @Get('cv/:id')
  findOneCV(@Param('id') id: number) {
    return this.mediaCVService.findOne(+id);
  }

  @ApiOkResponse({
    type: MediaCV,
  })
  @ApiBearerAuth()
  @Patch('cv/:id')
  updateCV(@Param('id') id: string, @Body() dto: UpdateMediaCVDto) {
    return this.mediaCVService.update(+id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete('cv/:id')
  removeCV(@Param('id') id: string) {
    return this.mediaCVService.remove(+id);
  }
}

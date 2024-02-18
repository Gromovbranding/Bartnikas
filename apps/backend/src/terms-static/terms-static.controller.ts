import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TermsStaticService } from './terms-static.service';
import { CreateTermsStaticDto } from './dto/create-terms-static.dto';
import { UpdateTermsStaticDto } from './dto/update-terms-static.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteAnyResponseDto } from 'src/shared/dto/delete-any-response.dto';
import { TermsStatic } from './entities/terms-static.entity';
import { Public } from 'src/auth/constants';

@ApiTags('Terms page accordions')
@Controller('terms-static')
export class TermsStaticController {
  constructor(private readonly termsStaticService: TermsStaticService) {}

  @ApiCreatedResponse({
    type: TermsStatic,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreateTermsStaticDto) {
    return this.termsStaticService.create(createFaqDto);
  }

  @ApiOkResponse({
    type: [TermsStatic],
  })
  @Public()
  @Get()
  findAll() {
    return this.termsStaticService.findAll();
  }

  @ApiOkResponse({
    type: TermsStatic,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termsStaticService.findOne(+id);
  }

  @ApiCreatedResponse({
    type: TermsStatic,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateTermsStaticDto) {
    return this.termsStaticService.update(+id, updateFaqDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termsStaticService.remove(+id);
  }
}

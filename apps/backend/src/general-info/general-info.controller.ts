import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeneralInfoService } from './general-info.service';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { Public } from 'src/auth/constants';

@Controller('general-info')
export class GeneralInfoController {
  constructor(private readonly generalInfoService: GeneralInfoService) {}

  @Post()
  create(@Body() createGeneralInfoDto: CreateGeneralInfoDto) {
    return this.generalInfoService.create(createGeneralInfoDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.generalInfoService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalInfoService.findOne(+id);
  }

  @Public()
  @Get('/only/active')
  findActive() {
    return this.generalInfoService.findActive();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneralInfoDto: UpdateGeneralInfoDto,
  ) {
    return this.generalInfoService.update(+id, updateGeneralInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalInfoService.remove(+id);
  }
}

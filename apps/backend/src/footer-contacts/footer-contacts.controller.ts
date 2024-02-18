import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FooterContactsService } from './footer-contacts.service';
import { CreateFooterContactDto } from './dto/create-footer-contact.dto';
import { UpdateFooterContactDto } from './dto/update-footer-contact.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/constants';
import { FooterContact } from './entities/footer-contact.entity';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Footer contacts')
@Controller('footer-contacts')
export class FooterContactsController {
  constructor(private readonly footerContactsService: FooterContactsService) {}

  @ApiCreatedResponse({
    type: FooterContact,
  })
  @Public()
  @Post()
  create(@Body() createFooterContactDto: CreateFooterContactDto) {
    return this.footerContactsService.create(createFooterContactDto);
  }

  @ApiOkResponse({
    type: [FooterContact],
  })
  @Public()
  @Get()
  findAll() {
    return this.footerContactsService.findAll();
  }

  @ApiOkResponse({
    type: FooterContact,
  })
  @Public()
  @Get('/only/active')
  findActive() {
    return this.footerContactsService.findActive();
  }

  @ApiOkResponse({
    type: FooterContact,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.footerContactsService.findOne(+id);
  }

  @ApiOkResponse({
    type: FooterContact,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFooterContactDto: UpdateFooterContactDto,
  ) {
    return this.footerContactsService.update(+id, updateFooterContactDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.footerContactsService.remove(+id);
  }
}

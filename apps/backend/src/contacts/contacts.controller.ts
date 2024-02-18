import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Contacts } from './entities/contacts.entity';
import { Public } from '../auth/constants';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @ApiOkResponse({
    type: [Contacts],
  })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @ApiOkResponse({
    type: Contacts,
  })
  @ApiBearerAuth()
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.contactService.findById(id);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.contactService.delete(id);
  }

  @ApiOkResponse({
    type: Contacts,
  })
  @ApiBearerAuth()
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.contactService.findByEmail(email);
  }

  @ApiCreatedResponse({
    type: Contacts,
  })
  @Public()
  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }
}

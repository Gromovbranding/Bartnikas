import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BioTestimonialsService } from './bio-testimonials.service';
import { CreateBioTestimonialDto } from './dto/create-bio-testimonial.dto';
import { UpdateBioTestimonialDto } from './dto/update-bio-testimonial.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/constants';
import { BioTestimonial } from './entities/bio-testimonial.entity';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Testimonials on about me page')
@Controller('bio-testimonials')
export class BioTestimonialsController {
  constructor(
    private readonly bioTestimonialsService: BioTestimonialsService,
  ) {}

  @ApiCreatedResponse({
    type: BioTestimonial,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreateBioTestimonialDto) {
    return this.bioTestimonialsService.create(createFaqDto);
  }

  @ApiOkResponse({
    type: [BioTestimonial],
  })
  @Public()
  @Get()
  findAll() {
    return this.bioTestimonialsService.findAll();
  }

  @ApiOkResponse({
    type: BioTestimonial,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bioTestimonialsService.findOne(+id);
  }

  @ApiCreatedResponse({
    type: BioTestimonial,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateBioTestimonialDto,
  ) {
    return this.bioTestimonialsService.update(+id, updateFaqDto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bioTestimonialsService.remove(+id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Testimonials } from './entities/testimonials.entity';
import { CreateTestimonialsDto } from './dto/create-testimonials.dto';
import { Public } from '../auth/constants';
import { UpdateTestimonialsDto } from './dto/update-testimonials.dto';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @ApiCreatedResponse({
    type: Testimonials,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateTestimonialsDto) {
    return this.testimonialsService.createTestimonials(dto);
  }

  @ApiOkResponse({
    type: [Testimonials],
  })
  @Public()
  @Get()
  findAll() {
    return this.testimonialsService.findAllTestimonials();
  }

  @ApiOkResponse({
    type: Testimonials,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testimonialsService.findOneTestimonials(id);
  }

  @ApiOkResponse({
    type: Testimonials,
  })
  @ApiBearerAuth()
  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() dto: UpdateTestimonialsDto) {
    return this.testimonialsService.updateOneTestimonials(id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testimonialsService.removeOneTestimonials(id);
  }
}

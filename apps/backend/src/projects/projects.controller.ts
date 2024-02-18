import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { Public } from '../auth/constants';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';
import { OrderByEmailDto } from './dto/order-by-email.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiCreatedResponse({
    type: Project,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @ApiOkResponse({
    type: [Project],
  })
  @Public()
  @Get()
  findAll() {
    return this.projectsService.findAllProjects();
  }

  @ApiOkResponse({
    type: Project,
  })
  @Public()
  @Get('/by-footer-card')
  getFooterCard() {
    return this.projectsService.getFooterCard();
  }

  @ApiOkResponse({
    type: Project,
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectsService.findOneProject(id);
  }

  @ApiOkResponse({
    type: [String],
  })
  @Public()
  @Get('/group/all')
  findAllGroups() {
    return this.projectsService.findAllGroups();
  }

  @ApiOkResponse({
    type: Project,
  })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, dto);
  }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectsService.removeProject(id);
  }

  @ApiCreatedResponse({
    type: Boolean,
  })
  @Public()
  @Post('order/by-email')
  orderByEmail(@Body() dto: OrderByEmailDto) {
    return this.projectsService.orderByEmail(dto);
  }

  @ApiCreatedResponse({
    type: Boolean,
  })
  @Delete('order/by-email/:id')
  deleteOrderByEmail(@Param('id') id: string | number) {
    return this.projectsService.deleteOrderByEmail(id);
  }

  @ApiCreatedResponse({
    type: Boolean,
  })
  @Get('order/by-email')
  getAllOrderByEmail() {
    return this.projectsService.getAllOrderByEmail();
  }

  // @ApiCreatedResponse({
  //   type: String,
  // })
  // @Public()
  // @Post('order/by-payment')
  // orderByPayment(@Body() dto: OrderByPaymentDto) {
  //   return this.projectsService.orderByPayment(dto);
  // }
}

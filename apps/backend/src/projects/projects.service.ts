import { PaymentsService } from '../shared/services/payments.service';
import { EmailSender } from '../shared/services/email-sender.service';
import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IsNull, Not } from 'typeorm';
import { OrderByEmailDto } from './dto/order-by-email.dto';
import { OrderByPaymentDto } from '../shared/dto/order-by-payment.dto';
import { ProjectPaymentByEmail } from './entities/project-payment-by-email.entity';
import { LanguageService } from '../shared/language/language.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectPaymentByEmail)
    private readonly projectPaymentByEmailRepository: Repository<ProjectPaymentByEmail>,
    private readonly emailSender: EmailSender,
    private readonly paymentsService: PaymentsService,
    private readonly langService: LanguageService,
  ) {}

  async createProject(dto: CreateProjectDto) {
    let collab = dto.collab;

    const translate = await this.langService.translate(dto.translate);
    if (collab) {
      collab = {
        ...dto.collab,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        translate: await this.langService.translate(dto.collab?.translate),
      };
    }

    return await this.projectRepository.save({
      ...dto,
      collab,
      translate,
    });
  }

  async findAllProjects() {
    return await this.projectRepository.find({
      order: {
        details: {
          order: 'ASC',
        },
      },
    });
  }

  async findAllGroups() {
    const response = await this.projectRepository.find({
      where: {
        group: Not(IsNull()),
      },

      select: {
        group: true,
      },
    });

    return [...new Set(response.flatMap((val) => val.group))];
  }

  async findOneProject(id: number) {
    return await this.projectRepository.findOne({
      where: { id },
      order: {
        details: {
          order: 'ASC',
        },
      },
    });
  }

  async updateProject(id: number, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      throw new UnprocessableEntityException();
    }

    let collab = project.collab;

    const translate = await this.langService.translate(dto.translate);
    if (dto.collab) {
      collab = {
        ...dto.collab,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        translate: await this.langService.translate(dto.collab?.translate),
      };
    }

    return await this.projectRepository.save({
      ...dto,
      collab,
      id,
      translate,
    });
  }

  async removeProject(id: number) {
    const isExist = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new UnprocessableEntityException();
    }

    return await this.projectRepository.delete(id);
  }

  async getAllOrderByEmail() {
    const all = await this.projectPaymentByEmailRepository.find();

    return await Promise.all(
      all.map(async (order) => {
        const project = await this.findOneProject(order.project_id);
        const projectImage = project.details.find(
          (item) => item.id === order.image_id,
        );

        const size = projectImage.sizes.find(
          (item) => item.id === order.selected_size_id,
        );

        return {
          id: order.id,
          name: order.name,
          email: order.email,
          image_name: projectImage.image_name,
          url: `${process.env.APP_FRONTEND_URL}/projects/${project.id}/order/${projectImage.id}`,
          price: projectImage.price,
          size: size,
          status: 'Sent Email',
          created_at: order.created_at,
          updated_at: order.updated_at,
        };
      }),
    );
  }

  async getFooterCard() {
    return await this.projectRepository.findOneBy({
      is_show_index_footer_card: true,
    });
  }

  async orderByEmail(dto: OrderByEmailDto) {
    const order = await this.projectPaymentByEmailRepository.save(
      this.projectPaymentByEmailRepository.create(dto),
    );

    if (!order) {
      throw new BadRequestException();
    }

    const project = await this.findOneProject(order.project_id);
    const projectImage = project.details.find(
      (item) => item.id === order.image_id,
    );

    const size = projectImage.sizes.find(
      (item) => item.id === order.selected_size_id,
    );

    const template = `
      <p><b> Client name: </b> <span>${order.name}</span></p>
      <p><b> Client Email: </b> <span>${order.email}</span></p>

      <p><h2>Ordered Image Details</h2></p>

      <p><b> Ordered image name: </b> <span>${projectImage.image_name}</span></p>
      <p><b> Ordered image size: </b> <span>${size.width} x ${size.height} ${size.unit}</span></p>
      <p><b> Ordered image link: </b> <span>${process.env.APP_FRONTEND_URL}/projects/${project.id}/order/${projectImage.id}</span></p>
    `;

    return await this.emailSender.sendEmailToHome({
      subject: 'Order new photo',
      html: template,
    });
  }

  async deleteOrderByEmail(id: string | number) {
    return await this.projectPaymentByEmailRepository.delete(id);
  }

  async orderByPayment(dto: OrderByPaymentDto) {
    return await this.paymentsService.createPayment(dto);
  }
}

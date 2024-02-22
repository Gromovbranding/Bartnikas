import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FilesService } from './files.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { storage } from './data/storage';
import { CreateFileDbDto } from './dto/create-file-db.dto';
import { DeleteAnyResponseDto } from '../shared/dto/delete-any-response.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiCreatedResponse({
    type: CreateFileDbDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  async createFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.createFile(file);
  }

  @ApiCreatedResponse({
    type: [CreateFileDbDto],
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 11, storage))
  async createFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    return await this.filesService.createFiles(files);
  }

  // @ApiOkResponse({
  //   type: Buffer,
  // })
  // @Public()
  // @Get(':filename')
  // async getFile(@Param('filename') filename: string, @Res() res: Response) {
  //   res.sendFile(join(process.cwd(), `./uploads/files/${filename}`));
  // }

  @ApiOkResponse({
    type: DeleteAnyResponseDto,
  })
  @ApiBearerAuth()
  @Delete(':filename')
  async deleteFile(@Param('filename') id: string) {
    return await this.filesService.deleteFile(id);
  }
}

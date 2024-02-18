import { Express } from 'express';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { fileUnlink } from './data/storage';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
  ) {}

  async createFile(file: Express.Multer.File) {
    return {
      name: file.filename,
    };
  }

  async createFiles(files: Array<Express.Multer.File>) {
    return files.map((item) => ({
      name: item.filename,
    }));
  }

  async deleteFile(filename: string) {
    const foundFile = await this.filesRepository.findOneBy({
      name: filename,
    });

    try {
      if (foundFile) {
        return await this.filesRepository.remove(foundFile);
      }

      return await fileUnlink(filename);
    } catch (exc) {
      throw new BadRequestException('File not deleted');
    }
  }
}

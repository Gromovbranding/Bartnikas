import { v4 as uuid } from 'uuid';
import { extname, resolve } from 'path';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { readdir, unlink } from 'fs/promises';

export const destination = './uploads/files';

export const fileUnlink = async (filename: string): Promise<boolean> => {
  const rootDir = '../../../';
  const filesUploadsDestination = resolve(__dirname, rootDir, destination);

  const files = await readdir(filesUploadsDestination);

  const filteredFilesByFilename = files.filter((item) => item === filename);

  if (filteredFilesByFilename.length > 0) {
    try {
      await unlink(resolve(filesUploadsDestination, filename));
    } catch (exc) {
      throw exc;
    }

    return true;
  }

  return false;
};

export const storage: MulterOptions = {
  storage: diskStorage({
    destination,
    filename: (req, file, cb) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),

  fileFilter(req, file, cb) {
    if (
      !/(jpg|jpeg|png|svg\+xml|gif|pdf|mp4|mov|m4v|webp|avif)$/.test(
        file.mimetype,
      )
    ) {
      return cb(null, false);
    }

    cb(null, true);
  },
};

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import cloudinary from './cloudinary';

const storage: CloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: Request, file: Express.Multer.File) => {
    return {
      folder: 'circle-app',
      format: path.extname(file.originalname).substring(1),
      public_id: `circleapp-${+Date.now()}`,
    };
  },
});

const uploader: multer.Multer = multer({ storage: storage });

export default uploader;

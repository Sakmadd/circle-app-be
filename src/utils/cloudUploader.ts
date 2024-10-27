import cloudinary from '../middlewares/cloudinary';

export interface CloudinaryUploadResult {
  secure_url: string;
}

export async function cloudUploader(
  base64Image: string
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const formattedBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

    cloudinary.uploader.upload(
      `data:image/png;base64,${formattedBase64}`,
      (error, result) => {
        if (error) return reject(error);
        resolve(result as CloudinaryUploadResult);
      }
    );
  });
}

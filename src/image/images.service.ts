import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(imageBuffer: Buffer, imageType: string): Promise<string> {
    try {
      const uploadedImage = await cloudinary.uploader.upload(
        `data:${imageType};base64,${imageBuffer.toString('base64')}`,
        {
          upload_preset: 'your_upload_preset',
        },
      );
      return uploadedImage.secure_url; // Returning the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Error uploading image to Cloudinary');
    }
  }
}

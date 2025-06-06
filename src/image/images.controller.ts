import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('image')
export class ImagesController {
  constructor(private readonly imageUploadService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Call the service to upload the image to Cloudinary
    const imageUrl = await this.imageUploadService.uploadImage(file.buffer, file.mimetype);
    return { imageUrl }; // Return the image URL
  }
}

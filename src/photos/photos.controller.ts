import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import axios from 'axios';
import { UploadImageDTO } from './dto/upload-DTO';
import { PhotosService } from './photos.service';
import { GoogleDTO } from './dto/google-return-DTO';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MeasurementService } from '../measurement/measurement.service';
const fs = require('fs');

const editFileName = (req, file, callback) => {
  const name = file.originalname;
  const fileExtName = extname(file.originalname);
  callback(null, `${name}${fileExtName}`);
};

@Controller('photos')
export class PhotosController {
  logger: Logger = new Logger(PhotosService.name);
  constructor(
    private readonly photoService: PhotosService,
    private readonly measurementService: MeasurementService,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/measurements',
        filename: editFileName,
      }),
    }),
  )
  async uploadSingle(@UploadedFile() file, @Body() body: UploadImageDTO) {
    const uploader = async () => {
      const URL = 'http://localhost:9005/upload';
      const FormData = require('form-data');

      const form = new FormData();
      form.append('file', fs.createReadStream(file.path));

      const request_config = {
        headers: {
          ...form.getHeaders(),
        },
      };
      const result = await axios.post(URL, form, request_config);
      return result.data;
    };

    try {
      const measure = await this.measurementService.findOne(body.measurementId);
      if (!measure) {
        this.logger.error(
          `can not find measurement ${body.measurementId}, image upload likely also failed`,
        );
        throw new HttpException('measurement not found', HttpStatus.NOT_FOUND);
      }
      const google: GoogleDTO = await uploader();
      await this.photoService.appendImage(body.measurementId, google.data);
      return {
        data: {
          file: file.filename,
          google,
        },
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'issue in uploading image',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}

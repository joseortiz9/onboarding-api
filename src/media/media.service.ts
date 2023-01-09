import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFileUploadInput } from './dto/upload-file.input';
import { StorageService } from 'src/storage/storage.service';
import { MediaFile } from './models/media-file.model';

@Injectable()
export class MediaService {
  constructor(
    private storageService: StorageService,
    private prisma: PrismaService
  ) {}

  async create({ fileUpload, locationSlug }: CreateFileUploadInput) {
    const _fileUpload = await fileUpload;
    return new Promise(async (resolve, reject) => {
      this.storageService.saveFromGraphql(
        _fileUpload,
        locationSlug,
        async (file: Omit<MediaFile, 'id'>) => {
          if (file?.url) {
            const fileDb = await this.prisma.file.create({
              data: {
                ...file,
              },
            });
            resolve(fileDb);
          } else {
            reject('ERROR!');
            throw new HttpException(
              'was not possible to save the file',
              HttpStatus.BAD_REQUEST
            );
          }
        }
      );
    });
  }
}

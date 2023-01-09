import { Injectable } from '@nestjs/common';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import StorageConfig from './storage-config';
import { StorageFile } from './entities/storage-file.entity';
import { FileUpload } from '../common/models/file-upload.model';
import { Optional } from '../common/utils';
import { MediaFile } from '../media/models/media-file.model';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      keyFilename: StorageConfig.keyFilename,
      // credentials: {
      //   client_email: StorageConfig.client_email,
      //   private_key: StorageConfig.private_key,
      // },
    });
    this.bucket = StorageConfig.mediaBucket;
  }

  saveFromGraphql(
    fileUpload: FileUpload,
    locationSlug: string | undefined,
    onUpload: (file: Optional<MediaFile, 'id'>) => void
  ) {
    const { createReadStream, filename, encoding, mimetype } = fileUpload;
    const path = locationSlug ? `${locationSlug}/${filename}` : filename;
    const metadata = [{ mediaId: filename, encoding, mimetype }];
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    createReadStream()
      .pipe(file.createWriteStream({ resumable: false, gzip: true }))
      .on('finish', async () => {
        await file.setMetadata({ metadata: object });
        return onUpload({
          url: file.metadata.mediaLink,
          name: file.metadata.name,
          mimetype: file.metadata.contentType,
          bucket: file.metadata.bucket,
          metadataUrl: file.metadata.selfLink,
        });
      });
  }

  save(
    path: string,
    contentType: string,
    media: Buffer | undefined,
    metadata: { [key: string]: string }[]
  ) {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream({ resumable: false, gzip: true });
    stream.on('finish', async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    stream.end(media);
    return stream;
  }

  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [metadata] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(
      Object.entries(metadata || {})
    );
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }
}

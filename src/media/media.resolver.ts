import { Resolver } from '@nestjs/graphql';
import { MediaFile } from './models/media-file.model';

@Resolver(() => MediaFile)
export class MediaResolver {}

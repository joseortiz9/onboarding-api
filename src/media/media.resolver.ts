import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MediaFile } from './models/media-file.model';
import { CreateFileUploadInput } from './dto/upload-file.input';
import { MediaService } from './media.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver(() => MediaFile)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}
  @Mutation(() => MediaFile)
  async uploadMedia(
    @Args('createFileUploadInput') createFileUploadInput: CreateFileUploadInput
  ) {
    return await this.mediaService.create({
      ...createFileUploadInput,
      locationSlug: 'test-folder',
    });
  }
}

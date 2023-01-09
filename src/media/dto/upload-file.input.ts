import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/models/file-upload.model';

@InputType()
export class CreateFileUploadInput {
  @Field(() => String)
  locationSlug?: string | null;
  @Field(() => GraphQLUpload)
  fileUpload: Promise<FileUpload>;
}

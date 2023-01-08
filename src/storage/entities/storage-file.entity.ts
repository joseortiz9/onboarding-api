import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StorageFile {
  buffer: Buffer;
  metadata: Map<string, string>;
  contentType: string;
}

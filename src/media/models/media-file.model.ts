import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class MediaFile extends BaseModel {
  url: string;
  name?: string;
  mimetype?: string;
}

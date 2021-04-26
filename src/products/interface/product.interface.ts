import { Document } from 'mongoose';
import { EMediaType } from './media-type.enum';

export class Product extends Document {
  readonly _id: string;
  readonly rating: string;
  name: string;
  value: number;
  mediaType: EMediaType;
  thumbnail?: string;
  createdAt: Date;
}

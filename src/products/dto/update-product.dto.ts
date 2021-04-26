import { IsIn, IsString } from 'class-validator';
import { EMediaType } from '../interface/media-type.enum';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsIn([EMediaType.audio, EMediaType.image, EMediaType.video])
  mediaType: EMediaType;

  @IsString()
  thumbnail: string;
}

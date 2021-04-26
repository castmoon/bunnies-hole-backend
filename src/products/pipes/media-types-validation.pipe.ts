import { BadRequestException, PipeTransform } from '@nestjs/common';
import { EMediaType } from '../interface/media-type.enum';

export class MediaTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = [
    EMediaType.audio,
    EMediaType.image,
    EMediaType.video,
  ];

  transform(value: any) {
    const type = value.mediaType.toLowerCase();

    if (!this.isValidType(type)) {
      throw new BadRequestException(`${type} is invalid type`);
    }
    value.mediaType = this.allowedTypes[this.allowedTypes.indexOf(type)];
    return value;
  }

  isValidType(type: any) {
    const idx = this.allowedTypes.indexOf(type);

    return idx !== -1;
  }
}

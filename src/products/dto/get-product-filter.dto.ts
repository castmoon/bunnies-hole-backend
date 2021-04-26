import { IsIn, IsOptional } from 'class-validator';
import { EFilter } from '../interface/filter.enum';
import { EMediaType } from '../interface/media-type.enum';

export class GetProductFilterDto {
  @IsOptional()
  @IsIn([EMediaType.audio, EMediaType.video, EMediaType.image])
  mediaType: EMediaType;

  @IsOptional()
  @IsIn([EFilter.cheap, EFilter.expensive, EFilter.older, EFilter.recent])
  filterBy: EFilter;
}

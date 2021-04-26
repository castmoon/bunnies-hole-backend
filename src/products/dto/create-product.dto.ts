import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  mediaType: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  thumbnail: string;
}

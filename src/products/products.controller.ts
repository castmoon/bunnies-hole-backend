import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interface/product.interface';
import { MediaTypeValidationPipe } from './pipes/media-types-validation.pipe';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe, MediaTypeValidationPipe)
  createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductFilterDto,
  ): Promise<Product[]> {
    return this.productService.getProducts(filterDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') _id: string): Promise<void> {
    return this.productService.deleteProduct(_id);
  }

  @Put('/:id')
  updateProduct(
    @Param('id') _id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(_id, updateProductDto);
  }
}

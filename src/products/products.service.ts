import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EFilter } from './interface/filter.enum';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);

    product.createdAt = new Date();

    if (!createProductDto.thumbnail) {
      product.thumbnail = '';
    }

    try {
      return await product.save();
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
    const { mediaType, filterBy } = filterDto;

    if (mediaType && !filterBy) {
      return await this.productModel.find({ mediaType });
    }

    if (!mediaType && filterBy) {
      if (filterBy == EFilter.cheap) {
        return await this.productModel.find().sort({ value: 'ascending' });
      } else if (filterBy == EFilter.expensive) {
        return await this.productModel.find().sort({ value: 'descending' });
      } else if (filterBy == EFilter.older) {
        return await this.productModel.find().sort({ createdAt: 'ascending' });
      } else {
        return await this.productModel.find().sort({ createdAt: 'descending' });
      }
    }

    if (mediaType && filterBy) {
      if (filterBy == EFilter.cheap) {
        return await this.productModel
          .find({ mediaType })
          .sort({ value: 'ascending' });
      } else if (filterBy == EFilter.expensive) {
        return await this.productModel
          .find({ mediaType })
          .sort({ value: 'descending' });
      } else if (filterBy == EFilter.older) {
        return await this.productModel
          .find({ mediaType })
          .sort({ createdAt: 'ascending' });
      } else {
        return await this.productModel
          .find({ mediaType })
          .sort({ createdAt: 'descending' });
      }
    }

    const query = await this.productModel.find();

    if (query.length == 0) {
      throw new NotFoundException('Products not found');
    }
    return query;
  }

  async deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await this.productModel.deleteOne({ _id: _id });

    if (deletedProduct.deletedCount === 0) {
      throw new BadRequestException(
        `Not possible to delete product with this ID ${_id}`,
      );
    }
  }

  async updateProduct(
    _id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const productUpdated = await this.productModel.findByIdAndUpdate(
      _id,
      {
        $set: updateProductDto,
      },
      { new: true },
    );

    if (productUpdated == null) {
      throw new BadRequestException(
        `Not possible to modify. Probably you have provided a invalid id or product not exists`,
      );
    }
    return productUpdated;
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_STORE_URI ||
        'mongodb+srv://bunnies:bunnies@bunnieshole.hcttt.mongodb.net/bunnies',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    ),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

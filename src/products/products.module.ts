import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), 
    UsersModule,
    MulterModule.register({ dest: '../uploads' })
  ],
  controllers: [ProductsController],
  providers: [ProductsService,],
  exports: [ProductsService]
})
export class ProductsModule {}

import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ProductDto } from './dto/product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10 ,{
    dest: 'uploads/'
  }))
  updateProduct(@Body() product:ProductDto, @UploadedFiles( ) files: Array<Express.Multer.File>){
    return this.productsService.updateProduct(product, files);
  }

  @Get(':name')
  findOne(@Param('name') name: string ){
    return this.productsService.findOneProduct(name);
  }
}
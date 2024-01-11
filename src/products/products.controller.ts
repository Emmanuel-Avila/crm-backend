import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, UseGuards, Post, UploadedFiles, UseInterceptors, UsePipes, BadRequestException } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/users/auth.guard';
import { TransformDocumentNamesPipe } from "./pipes/documet.pipe";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new TransformDocumentNamesPipe())
  @UseInterceptors(FilesInterceptor('files', 10 ,{
    dest: 'uploads/'
  }))
  updateProduct(@Body() product, @UploadedFiles( ) files: Array<Express.Multer.File>){
    if(product.error){
      throw new BadRequestException(product);
    }
    return this.productsService.updateProduct(product, files);
  }

  @UseGuards(AuthGuard)
  @Get(':name')
  findOne(@Param('name') name: string ){
    return this.productsService.findOneProduct(name);
  }
}
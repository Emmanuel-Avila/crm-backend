import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, Product, ProductDocument } from "./schemas/product.schema";
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ProductDto } from './dto/product.dto';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ProductsService{
  private logger = new Logger(ProductsService.name);
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  private readonly configService: ConfigService
  ){}

  async updateProduct(product:ProductDto, files){
    try {
      this.logger.log("Products Service - UPDATE PRODUCT - Starting")
      const productB = await this.productModel.findOne({name: product.name});
      if(files.length !== 0){
        
        for(let i=0; i<product.addIndexs.length; i++){
          if(product.addIndexs[i]+1 > productB.documents.length){
            
            const document = this.uploadFile(files[i],product.documentNames[product.addIndexs[i]],product.name);

            productB.documents.push(document);
            productB.markModified('documents');
          }else{

            productB.documents[product.addIndexs[i]] = this.uploadFile(files[i],product.documentNames[product.addIndexs[i]],product.name);
          }
        }

      }

      if(product.documentNames.length < productB.documents.length){
        productB.documents = productB.documents.filter(doc => product.documentNames.includes(doc.name));
      }


      if(product.documentNames.length == productB.documents.length){

        product.documentNames.forEach((docName, index) => {
          productB.documents[index].name = docName;
        })
        
      }
      
      productB.markModified('documents');
      productB.benefits = product.benefits;
      productB.requirements = product.requirements;
      productB.details = product.details;

      productB.save();
      this.logger.log("Products Service - UPDATE PRODUCT - Finished")
      return { productB };
    } catch (error) {
      this.logger.log("Products Service - UPDATE PRODUCT - Failed", error)
      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  async findOneProduct(name: string){
    try {
      this.logger.log("Products Service - FIND PRODUCT - Starting")

      const product = await this.productModel.findOne({name});

      this.logger.log("Products Service - FIND PRODUCT - Finished")
      return product
      
    } catch (error) {
      this.logger.log("Products Service - FIND PRODUCT - Failed", error)
      throw new BadRequestException(error);
    }
  }

  uploadFile(file, name, carpetName): Document{
    const newFileName = `upload_${Date.now()}${path.extname(file.originalname)}`;
    const publicUploadsPath = path.join(__dirname, '..', '..', 'public', 'uploads', carpetName);
    const newPath = path.join(publicUploadsPath,newFileName);

    const uploadsBaseUrl = this.configService.get<string>('SERVER');
    const relativePath = `uploads/${carpetName}/${newFileName}`;
    const completeUrl = `${uploadsBaseUrl}/${relativePath}`;


    if (!fs.existsSync(publicUploadsPath)) {
      fs.mkdirSync(publicUploadsPath, { recursive: true });
    }

    fs.renameSync(file.path, newPath);


    const document = {
      name: name || file.originalname,
      link: completeUrl,
    }
    return document
  }
} 
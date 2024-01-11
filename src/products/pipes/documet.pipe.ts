import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ProductDto } from '../dto/product.dto';
import { validateSync } from 'class-validator';

@Injectable()
export class TransformDocumentNamesPipe implements PipeTransform<any> {
  async transform(value: any) {
    console.log(value)
    if (value.documentNames && !Array.isArray(value.documentNames)) {
      value.documentNames = [value.documentNames];
      
    }
    if(value.addIndexs){
      value.addIndexs = JSON.parse(value.addIndexs)
    }
    

    const data = plainToClass(ProductDto, value)
    const errorList = validateSync(data);
    if(errorList.length > 0){
      return {
        message: errorList,
        error: "Bad Request",
        statusCode: 400
      } 
    }
    return value;
  }
}
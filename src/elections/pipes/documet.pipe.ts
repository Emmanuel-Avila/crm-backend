import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ElectionDto } from '../dto/election.dto';

@Injectable()
export class TransformDocumentNamesPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log("al menos llego", value.documentNames)
    if (!Array.isArray(value.documentNames)) {
      value.documentNames = [value.documentNames];
    }
    console.log(value)
    return value;
  }
}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { DiscountSchema, Discount } from './schemas/discount.schema';
import { DiscountService } from './discount.service';
import { DiscountController } from './discounts.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Discount.name, schema: DiscountSchema }]), UsersModule],
  controllers: [DiscountController],
  providers: [DiscountService,],
  exports: [DiscountService]
})
export class DiscountModule {}
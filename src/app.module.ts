import { Module, ValidationPipe, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { UsModule } from './us/us.module';
import { UsController } from './us/us.controller';
import { LandingImagesModule } from './landing/landing.module';
import { LandingImagesController } from './landing/landing.controller';
import { DigitalServicesModule } from './digital/digitalServices.module';
import { DigitalServicesController } from './digital/digitalServices.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ComplaintsModule } from './complaints/complaints.module';
import { ComplaintsController } from './complaints/complaints.controller';
import { AccountsModule } from './accounts/accounts.module';
import { AccountsController } from './accounts/accounts.controller';
import { HealthModule } from './health/health.module';
import { HealthController } from './health/health.controller';
import { SocialPrevisionModule } from './social/socialPrevision.module';
import { SocialPrevisionController } from './social/socialPrevision.controller';
import { TrainingModule } from './training/training.module';
import { TrainingController } from './training/training.controller';
import { EventModule } from './events/events.module';
import { EventController } from './events/events.controller';
import { DiscountModule } from './discounts/discount.module';
import { DiscountController } from './discounts/discounts.controller';
import { CovenantModule } from './covenant/covenant.module';
import { CovenantController } from './covenant/covenant.controller';
import { FairModule } from './fair/fair.module';
import { FairController } from './fair/fair.controller';
import { TransparencyModule } from './transparency/transparency.module';
import { TransparencyController } from './transparency/transparency.controller';
import { ElectionModule } from './elections/election.module';
import { ElectionController } from './elections/election.controller';
import { OfficeModule } from './offices/office.module';
import { OfficeController } from './offices/office.controller';

@Module({
  imports: 
  [
    ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`, isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BlogModule,
    UsersModule,
    ProductsModule,
    UsModule,
    LandingImagesModule,
    DigitalServicesModule,
    ComplaintsModule,
    AccountsModule,
    HealthModule,
    SocialPrevisionModule,
    TrainingModule,
    EventModule,
    DiscountModule,
    CovenantModule,
    FairModule,
    TransparencyModule,
    ElectionModule,
    OfficeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: 
  [
    AppController, 
    BlogController, 
    UsersController, 
    ProductsController, 
    UsController, 
    LandingImagesController,
    DigitalServicesController,
    ComplaintsController,
    AccountsController,
    HealthController,
    SocialPrevisionController,
    TrainingController,
    EventController,
    DiscountController,
    CovenantController,
    FairController,
    TransparencyController,
    ElectionController,
    OfficeController,
  ],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true
      })
    }
  ],
})
export class AppModule {
}

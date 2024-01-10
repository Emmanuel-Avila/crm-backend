import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";
import { Health, HealthSchema } from "./schemas/health.schema";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [MongooseModule.forFeature([{name: Health.name, schema: HealthSchema}]), UsersModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService]
})
export class HealthModule{}
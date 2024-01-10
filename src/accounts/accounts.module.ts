import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.services";
import { AccountsSchema, Accounts } from "./schemas/accounts.schema";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [MongooseModule.forFeature([{name: Accounts.name, schema: AccountsSchema }]), UsersModule],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService]
})
export class AccountsModule{}
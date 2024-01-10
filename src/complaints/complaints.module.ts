import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ComplaintService } from "./complaints.service";
import { ComplaintsController } from "./complaints.controller";
import { MulterModule } from '@nestjs/platform-express';
import { ComplaintsSchema, Complaints } from "./schema/complaint.schema";
import { Comments, CommentsSchema } from "./schema/comment.schema";
import { ResponsesSchema, Responses } from "./schema/responses.schema";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MulterModule.register({ dest: '../uploads' }),
    MongooseModule.forFeature([
      {name:Complaints.name, schema: ComplaintsSchema }, 
      { name:Comments.name, schema: CommentsSchema }, 
      {name: Responses.name, schema: ResponsesSchema},
    ]),
    UsersModule
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintService],
  exports: [ComplaintService]
})
export class ComplaintsModule{}
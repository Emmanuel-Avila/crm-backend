import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
@Module({
  imports: [ 
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      global: true,
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: '3h'}
    }),
    inject: [ConfigService],
  }),
  ConfigModule.forRoot()
],
  controllers: [UsersController],
  providers: [UsersService ],
  exports: [UsersService]
})
export class UsersModule {}

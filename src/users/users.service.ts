import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument} from './schemas/user.schema'; 
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}
  async create(userB: UserDto) {
    try {
      this.logger.log('Users Service - Find User - STARTING')
      const user = await this.userModel.findOne({ email: userB.email});

      if(!user){
        throw new UnauthorizedException('Email no existe');
      }

      if(!await bcrypt.compare(userB.password, user.password)){
        throw new UnauthorizedException ('Contraseña no coincide')
      }

      const { _id, email, type, name, surname } = user
      const fUser = {_id, email, type, name, surname};

      const payload = { sub: user.id, email: user.email, name: user.name };
      const jwt = await this.jwtService.signAsync(payload);

      this.logger.log('Users Service - Find User - FINISHED')
      return { fUser, jwt};
    } catch (error) {
      this.logger.log('Users Service - Find User - FAILED', error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }
      throw new BadRequestException(error);

    }
  }

  async validate(token: string){
    return await this.jwtService.verifyAsync(token);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async updateUser(body: UpdateUserDto){
    try {
      this.logger.log('Users Service - Update User - STARTING')
      const user = await this.userModel.findById(body.id);

      user.email = body.email !== "" ? body.email : user.email;
      if(body.password !== ""){
        const hashedPassword = await bcrypt.hash(body.password, 10)
        user.password = hashedPassword;
      }
      user.name = body.name !== "" ? body.name : user.name;
      user.surname = body.surname !== "" ? body.surname : user.surname;
      user.save();

      const { _id, email, type, name, surname } = user
      const fUser = {_id, email, type, name, surname};

      this.logger.log('Users Service - Update User - FINISHED')
      return fUser;
    } catch (error) {
      this.logger.log('Users Service - Update User - FAILED', error)
      
      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }
      throw new BadRequestException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

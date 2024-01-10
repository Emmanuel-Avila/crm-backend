import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, 
  ForbiddenException,} from '@nestjs/common';
  
import { UsersService } from './users.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Por favor inicie sesión');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.authService.validate(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(error.message || 'sesion expirada! Por favor inicie sesion');
    }
  }
}
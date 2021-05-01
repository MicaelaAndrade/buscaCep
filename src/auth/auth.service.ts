import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './dtos/auth.dto';
import { AuthSecrety } from './dtos/authSecrety';
import { JwtDTO } from './dtos/jwt.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(jwtDTO: JwtDTO): Promise<Auth> {
    if (jwtDTO.user === 'admin' && jwtDTO.pass === 'admin') {
      const { accessToken } = this._createToken({ name: 'admin', id: 1 });

      return {
        username: 'admin',
        accessToken,
      };
    }
    throw new HttpException('Usuário não autorizado', HttpStatus.UNAUTHORIZED);
  }

  async validateUser(jwtDTO: JwtDTO): Promise<AuthSecrety> {
    if (jwtDTO.user === 'admin' && jwtDTO.pass === 'admin') {
      return { name: 'admin', id: 1 };
    }

    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }

  private _createToken(authSecrety: AuthSecrety) {
    // try {
    //   const accessToken = this.jwtService.sign(authSecrety);
    // } catch (error) {
    //   console.log(error);
    // }
    const accessToken = this.jwtService.sign(authSecrety);
    return {
      accessToken,
    };
  }
}

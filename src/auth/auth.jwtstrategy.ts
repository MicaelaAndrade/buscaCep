import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { AuthSecrety } from './dto/authSecrety';
import { JwtDTO } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Micaela',
    });
  }

  async validate(jwtDTO: JwtDTO): Promise<AuthSecrety> {
    const auth = await this.authService.validateUser(jwtDTO);
    if (!auth) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return auth;
  }
}

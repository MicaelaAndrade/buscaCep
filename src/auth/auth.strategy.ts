import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { AuthSecrety } from './dtos/authSecrety';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'Micaela',
    });
  }

  async validate(authSecrety: AuthSecrety): Promise<AuthSecrety> {
    const auth = await this.authService.validateUser(authSecrety);

    if (!auth) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return auth;
  }
}

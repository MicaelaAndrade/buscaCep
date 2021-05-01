import { Body, Controller, Post } from '@nestjs/common';
import { JwtDTO } from './dtos/jwt.dto';
import { AuthService } from './auth.service';
import { Auth } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() jwtDTO: JwtDTO): Promise<Auth> {
    return await this.authService.login(jwtDTO);
  }
}

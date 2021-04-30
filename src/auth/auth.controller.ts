import { Body, Controller, Post } from '@nestjs/common';
import { JwtDTO } from './dto/jwt.dto';
import { AuthService } from './auth.service';
import { Auth } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() jwtDTO: JwtDTO): Promise<Auth> {
    console.log('entrou controller');
    return await this.authService.login(jwtDTO);
  }
}

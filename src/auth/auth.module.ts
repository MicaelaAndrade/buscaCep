import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './api.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}

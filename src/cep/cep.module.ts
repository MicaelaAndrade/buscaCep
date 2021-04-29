import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';

@Module({
  imports: [HttpModule, CacheModule.register()], // cache-controll
  controllers: [CepController],
  providers: [CepService],
})
export class CepModule {}

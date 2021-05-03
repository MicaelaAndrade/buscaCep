import {
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InterCep } from './interfaces/cep.interface';
import { CepValidatorPipe } from './validators/cep.validator';
import { CepService } from './cep.service';
import { JwtAuthGuard } from '../auth/auth-jwlt.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/api/cep')
export class CepController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly cepService: CepService,
  ) {}

  @Get(':cep')
  @ApiResponse({
    status: 200,
  })
  @UseInterceptors(CacheInterceptor) // cache
  public async getCep(
    @Param('cep', new CepValidatorPipe(new Logger())) cep: string,
  ): Promise<InterCep> {
    return this.cepService.getAddressByCepCode(cep);
  }
}

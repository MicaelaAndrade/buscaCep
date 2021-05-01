import {
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InterCep } from './interfaces/cep.interface';
import { CepValidatorPipe } from './validators/cep.validator';
import { CepService } from './cep.service';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/api')
export class CepController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly cepService: CepService,
  ) {}

  @Get('/cep')
  @ApiResponse({
    status: 200,
  })
  @ApiQuery({
    name: 'cep',
    required: true,
    allowEmptyValue: false,
    type: 'string',
  })
  @UseInterceptors(CacheInterceptor) // cache
  public async getCep(
    @Query('cep', new CepValidatorPipe(new Logger())) cep: string,
  ): Promise<InterCep> {
    try {
      console.log('Entrou no cep');
      return this.cepService.getAddressByCepCode(cep);
    } catch (error) {
      console.log('Entrou no erro', error);
      throw new InternalServerErrorException(error);
    }
  }
}

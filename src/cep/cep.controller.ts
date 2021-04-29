import {
  CacheInterceptor,
  Controller,
  Get,
  HttpCode,
  Inject,
  InternalServerErrorException,
  Logger,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeaders,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InterCep } from './interfaces/cep.interface';
import { CepValidatorPipe } from './validators/cep.validator';
import { CepService } from './cep.service';

@ApiHeaders([
  {
    name: 'apiKey',
    allowEmptyValue: false,
    required: true,
    description: 'Autenticação da API',
  },
])
@Controller('/api/v1')
@ApiTags('CEP api')
@ApiSecurity('apiKey')
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
  @ApiBadRequestResponse({
    description: 'Valor inválido',
  })
  @UseInterceptors(CacheInterceptor) // cache
  public async getZipCode(
    @Query('cep', new CepValidatorPipe(new Logger())) cep: string,
  ): Promise<InterCep> {
    try {
      return this.cepService.getAddressByCepCode(cep);
    } catch (error) {
      this.logger.error(`/GET cep?=${cep} - CepController`, CepController.name);

      throw new InternalServerErrorException(error);
    }
  }

  @Get('/cep/check')
  @HttpCode(200)
  public async checkStatus() {
    try {
      const data = this.cepService.getAddressByCepCode('14405278');

      if (data) {
        return {
          ok: true,
          error: null,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

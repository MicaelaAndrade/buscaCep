import {
  HttpException,
  HttpService,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Cep } from './interfaces/cep.class';
import { InterCep } from './interfaces/cep.interface';

@Injectable()
export class CepService implements Cep {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  getAddressByCep: (cep: string) => Promise<InterCep>;

  /* regra de negocio */
  private replaceCharIndex = (
    code: string,
    index: number,
    replaceValue = '0',
  ): string => {
    if (index > code.length - 1) return code;
    return `${code.substring(0, index)}${replaceValue}${code.substring(
      index + 1,
    )}`;
  };

  public async getAddressByCepCode(cep: string, index = 7): Promise<InterCep> {
    let req = null;
    let validationCep = cep;

    if (validationCep !== '00000000') {
      req = await this.sendCepCode(validationCep);
      console.log('entrou', index);
      if (!req.erro) {
        return {
          cep: req.cep,
          logradouro: req.logradouro,
          bairro: req.bairro,
          localidade: req.localidade,
          uf: req.uf,
        };

        // CEP: 14405270 - index 6 replace 14405200
        // CEP: 14405200 - index 5 replace 14405000
        // CEP: 14405000 - index 4 replace 14400000

        // CEP: 14400000 - index 3 replace 14400000
        // CEP: 14400000 - index 2 replace 14000000
        // CEP: 14000000 - index 1 replace 10000000
        // CEP: 10000000 - index 0 replace 00000000
      } else if (index >= 0) {
        while (index > 0 && validationCep[index] === '0') {
          index--;
        }
        validationCep = this.replaceCharIndex(validationCep, index, '0');
        console.log({ cep, index, validationCep });
        return this.getAddressByCepCode(validationCep, index - 1);
      }
    }

    req = {
      error: `Cep invalidado: ${cep}`,
    };

    return req;
  }

  private statusError(error: any): void {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Houve problema interno no servidor no momento',
        description: error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private async sendCepCode(code: string): Promise<InterCep> {
    try {
      const response = await this.httpService.get<InterCep>(this.route(code));

      const { data } = await response.toPromise();

      return data;
    } catch (error) {
      this.logger.error(
        `Erro do servidor interno: ${error} - Status: 500 - method: sendCepCode`,
        CepService.name,
      );

      this.statusError(error);
    }
  }

  private route = (cep: string): string => {
    return `https://viacep.com.br/ws/${cep}/json/`;
  };
}

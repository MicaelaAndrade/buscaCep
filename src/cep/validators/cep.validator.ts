import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Logger,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class CepValidatorPipe implements PipeTransform {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  transform(cep: string): string {
    const valid = /^[0-9]{5}?((-|\s)?)[0-9]{3}$/g;
    const result = valid.test(cep);

    if (!result) {
      this.logger.error(
        `Insira um Cep validado: ${cep} `,
        CepValidatorPipe.name,
      );
      throw new BadRequestException('Cep inválido');
    }

    this.logger.debug(
      `/GET cep?=${cep} - CepValidatorPipe - valid cep`,
      CepValidatorPipe.name,
    );

    return (cep.trim().match(/\d+/g) || []).join('');
  }
}

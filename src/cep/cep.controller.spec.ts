import { CacheModule, HttpModule, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

describe('Cep Controller', () => {
  let controller: CepController;

  const cepService = {
    getAddressByCepCode: () => ({
      cep: '14405-275',
      logradouro: 'Rua Padre Conrado',
      bairro: 'Vila Santos Dumont',
      localidade: 'Franca',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepController],
      providers: [CepService, Logger],
      imports: [
        WinstonModule.forRoot({
          level: 'info',
          format: winston.format.json(),
          defaultMeta: { service: 'api-service' },
          transports: [
            new winston.transports.File({
              filename: 'logs/error.log',
              level: 'error',
            }),
            new winston.transports.File({
              filename: 'logs/debug.log',
              level: 'debug',
            }),
          ],
        }),
        HttpModule,
        CacheModule.register({
          ttl: 10,
          max: 10,
        }),
      ],
    })
      .overrideProvider(CepService)
      .useValue(cepService)
      .compile();

    controller = module.get<CepController>(CepController);
  });

  it('Deve retornar um endereço válido', async () => {
    controller.getCep('14405275').then((res) => {
      expect(res).toBeDefined();
      expect(res).toHaveProperty('localidade', 'Franca');
    });
  });
});

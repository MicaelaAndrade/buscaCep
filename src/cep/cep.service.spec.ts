import { CacheModule, HttpModule, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from './cep.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as nock from 'nock';

describe('Cep Service', () => {
  let service: CepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<CepService>(CepService);
  });

  it('Deve retornar um endereço válido', async () => {
    nock('https://viacep.com.br/ws').get('/14405275/json/').reply(200, {
      cep: '14405-275',
      logradouro: 'Rua Padre Conrado',
      bairro: 'Vila Santos Dumont',
      localidade: 'Franca',
      uf: 'SP',
    });

    service.getAddressByCepCode('14405275').then((res) => {
      expect(res).toBeDefined();
      expect(res).toHaveProperty('localidade', 'Franca');
    });
  });

  it('Cep não encontrado', async () => {
    nock('https://viacep.com.br/ws').get('/00000000/json/').reply(404, {
      cep: undefined,
      logradouro: undefined,
      bairro: undefined,
      localidade: undefined,
      uf: undefined,
    });
    service.getAddressByCepCode('00000000').then((res) => {
      expect(res).toBeDefined();
      expect(res).toHaveProperty('localidade', 'Franca');
    });
  });
});

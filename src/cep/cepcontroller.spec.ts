import {
  CacheModule,
  HttpModule,
  INestApplication,
  Logger,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import * as request from 'supertest';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

describe('Cep Controller', () => {
  let controller: CepController;
  let app: INestApplication;
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

    app = await module.createNestApplication();
    controller = module.get<CepController>(CepController);

    await app.init();
  });

  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  // it('Deve retornar um endereço válido', async () => {
  //   controller.getZipCode('14405275').then((res) => {
  //     expect(res).toBeDefined();
  //     expect(res).toHaveProperty('localidade', 'Franca');
  //   });
  // });

  it('/GET Deve retorna um endereço inválido', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/pvt/cep?cep=144052-75')
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Por favor insira um cep validado.',
        error: 'Bad Request',
      });
  });

  // it('/GET Deve retorna um endereço inválido', async () => {
  //   return request(app.getHttpServer())
  //     .get('/api/v1/pvt/cep?cep=14405275')
  //     .expect(400)
  //     .expect({
  //       statusCode: 400,
  //       message: 'Por favor insira um cep validado.',
  //       error: 'Bad Request',
  //     });
  // });

  it('/GET Deve retorna um endereço inválido', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/pvt/cep?cep= 144052-755')
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Por favor insira um cep validado.',
        error: 'Bad Request',
      });
  });

  it('Deve conter valor esperado, retorna endereço', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/pvt/cep?cep=14405275')
      .expect(200)
      .expect({
        cep: '14405-275',
        logradouro: 'Rua Padre Conrado',
        bairro: 'Vila Santos Dumont',
        localidade: 'Franca',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

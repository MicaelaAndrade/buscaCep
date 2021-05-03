import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../app.module';
import * as nock from 'nock';
import { JwtAuthGuard } from '../auth/auth-jwlt.guard';

describe('CepController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { name: 'admin', id: 1 };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    nock('https://viacep.com.br/ws').get('/14405275/json/').reply(200, {
      cep: '14405-275',
      logradouro: 'Rua Padre Conrado',
      bairro: 'Vila Santos Dumont',
      localidade: 'Franca',
      uf: 'SP',
    });
    return request(app.getHttpServer())
      .get('/api/cep/14405275')
      .expect(200)
      .expect(
        '{"cep":"14405-275","logradouro":"Rua Padre Conrado","bairro":"Vila Santos Dumont","localidade":"Franca","uf":"SP"}',
      );
  });
});

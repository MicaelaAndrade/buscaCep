import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as nock from 'nock';
import { JwtAuthGuard } from './auth-jwlt.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';

describe('AuthService', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, JwtModule.register({ secret: 'Micaela' })],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
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

  it('/auth/login (POST - 201) - Creat Token', () => {
    nock('http://localhost:3000/auth/login').get('application/json').reply(201);
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ user: 'admin', pass: 'admin' })
      .expect(201);
  });

  it('/ (POST)', () => {
    nock('http://localhost:3000/auth/login')
      .get('application/json')
      .reply(201, {
        user: 'admin',
        pass: 'pass',
      });
    return request(app.getHttpServer()).post('/auth/login').expect(401);
  });
});

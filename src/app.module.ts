import {
  CacheInterceptor,
  CacheModule,
  HttpModule,
  Logger,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { CepController } from './cep/cep.controller';
import { CepService } from './cep/cep.service';
import { CepModule } from './cep/cep.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './cep/middlewares/auth.middleware';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    CepModule,
    HttpModule,
    TerminusModule,
    CacheModule.register({
      // cache controll
      ttl: 10,
      max: 10,
    }),
    AuthModule,
    ConfigModule.forRoot({
      // set global env file
      isGlobal: true,
      envFilePath: '.env',
    }),
    WinstonModule.forRoot({
      // Loggers controll
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
  ],
  controllers: [CepController],
  providers: [
    Logger,
    CepService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/v1/pvt');
  }
}

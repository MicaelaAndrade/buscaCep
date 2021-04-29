import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docs = new DocumentBuilder()
    .setTitle('Busca Cep')
    .setDescription('Serviço busca de cep')
    .setVersion('1.0')
    .addApiKey({
      type: 'apiKey',
      name: 'apiKey',
      description: 'Autenticação do token',
    })
    .build();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)); // logger controll
  const document = SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.info(`Backend application is available at "http://localhost:3000".`);
}

bootstrap();

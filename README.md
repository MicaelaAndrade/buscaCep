<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## 👩🏻‍🏭 O projeto
<p align="center">Serviço de API desenvolvido com framework Nestjs que busca CEP qualquer localidade, o componente exporta uma função que retorna um endereço recebendo um cep como parâmetro.</p>

## 🥷🏻 Sobre o Desafio
[Aqui](doc/SOBRE.md)


### 👷🏻‍♀️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Nestjs](https://nestjs.com).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### ⚙️ Rodando Rotas - em analise

| TYPE | PATH | ARGS | QUERY | PARAMS | DESCRIÇÃO |
|------|------|------|-------|--------|-----------|
|GET| / | - | - | - | status do servidor |
| - | /api | - | - | - | Aplicação do swagger |
| - | /api/token | - | - | - | informa o token da aplicação |
| - | /api/14405275 | - | - | - | retorna os dados informado pelo cep |

### 👩🏻‍💻 Realizando teste com swagger - em analise

```bash
# Acessando a rota
$  http://localhost:3000/api
$  Precisa gerar o token primeiro, para poder fazer a consulta do cep informado.
$  Apos ter gerado o token informar no Authorize, feito isso acessar a rota GET informar o CEP.

# Estrutura do projeto
$  Foi pensado para facilitar maneira de consultar CEP de qualquer localidade,junto com API ViaCep.
$  Com o retorno dos  dados principais da aplicação .

Todo módulo do projeto tem sua responsabilidade, os arquivos estão configuração e padronizados no projeto.

BUSCA-CEP-NESTJS/
│── doc/
│   └── SOBRE.md
│   │── src/
│   │   ├── auth/
│   │   │   └── api.strategy.ts
│   │   │    └── auth.module.ts 
│   │   │    └── auth.service.spec.ts 
│   │   │    └── auth.service.ts 
│   │── cep/
│   │   │   │── __dto__/
│   │   │   │       └── cep.dto.ts
│   │   │   │── __interfaces__/
│   │   │   │       └──cep.class.ts
│   │   │   │       └── cep.interface.ts
│   │   │   │── __middlewares__/
│   │   │   │      └──auth.middleware.ts
│   │   │   │── __validators__/
│   │   │   │      └──cep.validator.ts
│   │   │── cep.controller.ts/
│   │   │── cep.module.ts/
│   │   │── cep.service.ts/
│   │── app.module.ts/
│   │──main.ts/
│──test/
│   └── app.e2e-spec.ts
│   └── jest-e2e.json
│── .env
│── .eslintrc.js
│── .gitignore
│── .prettierrc
│── nest-cli.json
│── package.json
│── README.md
│── tsconfig.build.json
│── tsconfig.json

```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Test the app

```bash
# development
$ npm test 
```


### 🙋🏻‍♀️ Autor

 <img style="border-radius: 50%;" src="https://user-images.githubusercontent.com/53954022/92161695-549d5400-ee07-11ea-9373-cc42e7ee53a5.png" width="100px;" alt=""/>
 <sub><b>Micaela Andrade</b></sub>

 👊🏼 Entre em contato!

[![Twitter Badge](https://img.shields.io/badge/-@micaelaandrade_-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/micaelaandrade_)](https://twitter.com/micaelaandrade_) [![Linkedin Badge](https://img.shields.io/badge/-Micaela-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/micaela-andrade/)](https://www.linkedin.com/in/micaela-andrade/)
[![Gmail Badge](https://img.shields.io/badge/-micaela17andrade@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:micaela17andrade@gmail.com)](mailto:micaela17andrade@gmail.com)


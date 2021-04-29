Nestjs

Nestjs é um Framework que facilita a construção de API's robustas e de alta escalabilidade com javascript/typescript. Elá possui um sistema de módulos que facilita a construção e o compartilhamento de classes/métodos.

Controllers: Responsável pela manipulação da Rota (Porta de entrada da aplicação/requisição)
Services: Camada acesso ao dados, exemplo uma camada de acesso ao banco de dados, no caso da API de CEP apenas é feita uma busca pelo CEP em uma aplicação externa usando o HTTPModule.

Modules: Onde se concentra os metadados, seria o arquivo principal de cada recurso da nossa API, onde podemos declarar outros módulos como dependência, importar e exportar módulos.
É fortemente orientada a objetos, e segue os princípios de desenvolvimento S.O.L.I.D.

Facilita a construção de endpoints com os Decorators do typescript.


Autenticação

Na parte de autenticação da API, a chave deve ser estar validada e correta, segue uma chave valida abaixo:
Api Key	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDEwMDE5NzgsImV4cCI6MTYzMjUzNzk3OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.QTXBYNVpEth0Vn3kkICu2JBBnJ6_XtrawrPPxJ2Oxz8
Endpoint

CEP: Busca o endereço pelo CEP
Propriedades	nome	tipo	exemplo
Query	cep	string	14405275
apiKey	apiKey	string	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDEwMDE5NzgsImV4cCI6MTYzMjUzNzk3OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.QTXBYNVpEth0Vn3kkICu2JBBnJ6_XtrawrPPxJ2Oxz8

Status 400 - com o CEP: 14405-275 (Lembre-se que são apenas os números sem traço)
{
  "statusCode": 400,
  "message": "Please enter a valid zip code",
  "error": "Bad Request"
}
Status 403 - Erro de autenticação
{
  "statusCode": 401,
  "message": "Unauthorized"
}
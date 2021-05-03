[voltar](../README.md)
# Serviço de BUSCA CEP

## Expor um serviço de BUSCA DE CEP.

Serviço de API desenvolvido com framework Nest.js que busca CEP qualquer localidade, o componente exporta uma função que retorna um endereço recebendo um cep como parâmetro.

### Exemplo:

```bash
GET /api/cep
Status: 200 - Resposta da api :
{
  "cep": "14405-275",
  "logradouro": "Rua Padre Conrado",
  "bairro": "Vila Santos Dumont",
  "localidade": "Franca",
  "uf": "SP",
}

```
# Sobre a forma que foi realizado o projeto: 
1. Foi pedido para substituir um digito da direita para esquerda até endereço seja localizado (foi usado a função recursiva).
2. Usado o framework Nest.js que facilita a construção de API's robustas e de alta escalabilidade e a construção de endpoints com os Decorators do typescript.
3. Arquitetura utilizado Axios é uma interface acessa os dados e manipula do pipelen HTTTP.
4. Foi utilizado API Viacep formato JSON.
5. Utilizado Node.js / Nest.js / Swagger / Mock, para teste.
6. Foi feito autenticação para API.
7. Estrutura da pasta é em ordenação, para ficar mais visivel e simples.

### Observações: 

1. Precisa gerar o token primeiro, para poder fazer a consulta do cep informado. 
2. Rodar comando abaixo será gerado o token.

```bash
curl -X 'POST' \
  'http://localhost:3000/auth/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
 "user": "admin",
 "pass": "admin"
}'
```
2. Apos ter gerado o token informar no Authorize(Swagger), feito isso acessar a rota GET informar o CEP.
3. Mesmo irá retorna os dados CEP, em formtato JSON.

### Requisitos: 

1. Uso da linguagens: Java ou Node.js/Nest.js 
2. Api com autorização.
3. Boas práticas de design de api.
4. Swagger com a documentação.
5. Logs estruturados.



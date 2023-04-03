# Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

Para executar este projeto você precisará criar um arquivo `.env` na raiz do
seu projeto com valores para as seguintes variáveis de ambiente:

- `PORT`
- `NODE_ENV`
- `JWT_SECRET`
- `DATABASE_URL`
- `BCRYPT_ROUNDS`

## Desafio 03

Desafio referente ao módulo: API Node.js com SOLID

## Requisitos Funcionais

São as funcionalidades específicas que o sistema deve oferecer para atender às
necessidades do usuário e cumprir os objetivos do negócio. Eles definem o que
o sistema deve fazer.

- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;
- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;

## Regras de Negócio

São as restrições, políticas, procedimentos e diretrizes que regem a operação do
negócio. Elas definem as restrições e diretrizes que o sistema deve seguir para
atender às necessidades do negócio e dos usuários.

- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Todos os filtros, além da cidade, são opcionais;

### Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.
`https://www.figma.com/community/file/1220006040435238030`

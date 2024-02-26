## FOODEXPLORER

Projeto criado para conclusão do certificado explorer da rockeatseat, a ideia do projeto era criar um aplicativo onde o usuario possa comprar produtos de comida diretamente da aplicação, a aplicação e composta de uma API para comunicação com o banco de dados e um front-end feito todo em react.

## Instalação

Siga estas etapas para instalar e executar o projeto em seu ambiente local.

1. Clone o repositório:

```bash
git clone url-do-repositorio
```

2. Navegue até o diretório do projeto:

```bash
cd nome-do-projeto
```

3. Instale as dependências:

```bash
npm install
```

ou se você estiver usando yarn:

```bash
yarn install
```

## Execução

Para executar o servidor, use o comando:

```bash
npm start
```

ou se você estiver usando yarn:

```bash
yarn start
```

O servidor agora deve estar rodando em `http://localhost:3333`.

## API

Aqui estão as rotas disponíveis na API:

- `GET /orders`: Retorna todos os pedidos.
- `POST /orders`: Cria um novo pedido.
- `GET /orders/:id`: Retorna detalhes de um pedido específico.
- `PUT /orders/:id`: Atualiza um pedido específico.
- `DELETE /orders/:id`: Exclui um pedido específico.

---
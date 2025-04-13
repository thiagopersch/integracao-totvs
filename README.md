# Meu Projeto Monorepo: Backend NestJS + Prisma + PostgreSQL (Docker) e Frontend Next.js

Este é um repositório monorepo que contém o backend e o frontend da minha aplicação. O backend é construído com NestJS, utilizando Prisma como ORM e PostgreSQL como banco de dados, tudo rodando em containers Docker. O frontend é desenvolvido com Next.js.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão LTS recomendada)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**

## Configuração e Execução

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Backend (NestJS + Prisma + PostgreSQL + Docker)

1.  **Navegue até o diretório do backend/api:**

    ```bash
    cd api
    ```

2.  **Instale as dependências do backend:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie ou faça uma copia do `.env.example` na raiz do diretório `backend`.

4.  **Execute o Docker Compose para iniciar o PostgreSQL:**

    ```bash
    npn run docker:dev
    # ou
    yarn docker:dev
    ```

5.  **Se quiser rodar o seeders no backend:**
    ```bash
    yarn seed
    # ou
    npm run seed
    ```

### Frontend (Next.js)

1.  **Navegue até o diretório do frontend:**

    ```bash
    cd ../client
    ```

2.  **Instale as dependências do frontend:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente (se necessário):**
    Crie um arquivo `.env` na raiz do diretório `client` para quaisquer variáveis de ambiente específicas do client conforme estão no `.env.example`.

4.  **Inicie o servidor de desenvolvimento do frontend:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

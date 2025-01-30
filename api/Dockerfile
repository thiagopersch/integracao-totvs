# Use uma imagem base oficial do Node.js
FROM node:latest as node-builder

# Instale o cliente PostgreSQL para usar pg_isready
RUN apt-get update && apt-get install -y postgresql-client

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos da aplicação para o contêiner
COPY . .

# Instala as dependências
RUN yarn install

# Instala o nodemon
RUN yarn add --dev nodemon

# Construa a aplicação
RUN yarn build

# Copie o script de entrada
COPY entrypoint.sh /app/entrypoint.sh

# Defina permissões para o script de entrada
RUN chmod +x /app/entrypoint.sh

# Exponha a porta em que a aplicação será executada
EXPOSE 3333

# Defina o script como ponto de entrada
ENTRYPOINT ["/app/entrypoint.sh"]

# Comando padrão para iniciar a aplicação
CMD ["npx", "nodemon", "--watch", "src", "--exec", "yarn dev"]

# Comando padrão para iniciar a aplicação (após execução do entrypoint.sh)
#CMD ["yarn", "dev"]

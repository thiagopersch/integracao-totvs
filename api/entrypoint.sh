#!/bin/sh

# Falha ao encontrar qualquer erro
set -e

# Aguarda o banco de dados estar disponível
echo "Esperando o banco de dados iniciar..."
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USERNAME"; do
  sleep 2
done

echo "Iniciando o servidor da aplicação..."
"$@" &  # Inicia o comando padrão do CMD (yarn dev) em segundo plano

# Aguarda um breve momento para garantir que o servidor foi iniciado
sleep 5

# Executa as migrações do Prisma
if [ "$NODE_ENV" = "production" ]; then
  echo "Executando as migrações do Prisma em produção..."
  npx prisma generate
  npx prisma migrate deploy --name init
else
  echo "Executando as migrações do Prisma em desenvolvimento..."
  npx prisma generate
  npx prisma migrate dev --name init
fi

# Mantém o contêiner rodando com o servidor
wait

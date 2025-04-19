#!/bin/sh

# Falha ao encontrar qualquer erro
set -e

# Aguarda o banco de dados estar disponível
echo "Esperando o banco de dados iniciar em $POSTGRES_HOST:$POSTGRES_PORT..."
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USERNAME"; do
  echo "Banco de dados não está pronto, tentando novamente em 2 segundos..."
  sleep 2
done
echo "Banco de dados está pronto!"

# Executa as migrações do Prisma
if [ "$NODE_ENV" = "production" ]; then
  echo "Executando as migrações do Prisma em produção..."
  npx prisma generate
  npx prisma migrate deploy --name init
else
  echo "Executando as migrações do Prisma em desenvolvimento..."
  npx prisma generate
  npx prisma migrate dev
fi

echo "Iniciando o servidor da aplicação..."
exec "$@" # Substitui o processo atual pelo comando padrão (yarn dev)

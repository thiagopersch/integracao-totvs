import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(this.softDeleteMiddleware); // Registra o middleware de soft delete
  }

  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  // Middleware para soft delete
  private softDeleteMiddleware = async (
    params: any,
    next: (params: any) => Promise<any>,
  ) => {
    // Filtra automaticamente registros com deleted_at preenchido em operações de busca
    if (['findUnique', 'findMany', 'findFirst'].includes(params.action)) {
      params.args.where = {
        ...params.args.where,
        deleted_at: null, // Garante que só retorna registros não deletados
      };
    }

    // Converte "delete" em "update" para soft delete
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deleted_at: new Date() };
    }

    // Converte "deleteMany" em "updateMany" para soft delete
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      params.args.data = { deleted_at: new Date() };
    }

    return next(params);
  };

  // Método para buscar registros incluindo os deletados (opcional)
  async findWithDeleted<T>(this: T, args: any) {
    return (this as any).findMany({
      ...args,
      where: { ...args.where }, // Não aplica o filtro de deleted_at
    });
  }
}

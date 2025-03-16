import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      // Usa uma transação para garantir atomicidade
      return await this.prisma.$transaction(async (tx) => {
        // Verifica se o email já existe dentro da transação
        const existUser = await tx.user.findUnique({
          where: { email: data.email },
          select: { email: true },
        });

        if (existUser) {
          throw new ConflictException('Já existe um usuário com este email.');
        }

        // Cria o usuário
        return tx.user.create({
          data: {
            ...data,
            password: hashedPassword,
            change_password: data.change_password ?? true,
            status: data.status ?? true,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: false,
            change_password: true,
            status: true,
            created_at: true,
            updated_at: true,
          },
        });
      });
    } catch (error) {
      // Trata erros específicos do Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Erro de constraint única (email duplicado)
          throw new ConflictException('Já existe um usuário com este email.');
        }
      }
      throw error; // Re-lança outros erros para serem tratados pelo NestJS
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        change_password: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
      where: { email: { not: process.env.ADMIN_EMAIL } },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        change_password: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id); // Verifica se o usuário existe

    // Se o email está sendo alterado, verifica se já existe outro usuário com ele
    if (data.email && data.email !== user.email) {
      const existUser = await this.prisma.user.findUnique({
        where: { email: data.email },
        select: { email: true },
      });
      if (existUser) {
        throw new ConflictException('Já existe um usuário com este email.');
      }
    }

    let updateData = { ...data };
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData = { ...updateData, password: hashedPassword };
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        change_password: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, password: false },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.prisma.user.delete({ where: { id } });
  }

  async findAllWithDeleted() {
    return this.prisma.findWithDeleted({
      omit: { password: true },
    });
  }
}

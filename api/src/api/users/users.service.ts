import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: { email: true },
    });

    if (existUser) {
      throw new AppError('Já existe um usuário com este email.', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    return user;
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
    const user = await this.findOne(id);

    let updateData = { ...data };

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      updateData = { ...updateData, password: hashedPassword };
    }

    const existUser = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    return this.prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}

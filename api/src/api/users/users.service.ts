import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'utils/appError';
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
      throw new AppError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
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
      throw new AppError('User not found.', 404);
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
      throw new AppError('User not found.', 404);
    }

    return this.prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}

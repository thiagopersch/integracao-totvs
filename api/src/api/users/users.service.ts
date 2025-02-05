import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
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
      throw new UnauthorizedException('Já existe um usuário com este email.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { id, ...rest } = data;

    const user = await this.prisma.user.create({
      data: { ...rest, password: hashedPassword },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { deleted_at: null },
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
      orderBy: [{ name: 'asc' }, { status: 'asc' }],
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

    if (data.password && data.password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData = { ...updateData, password: hashedPassword };
    } else {
      delete updateData.password;
    }

    const existUser = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existUser) {
      throw new NotFoundException('Usuário não encontrado.');
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
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}

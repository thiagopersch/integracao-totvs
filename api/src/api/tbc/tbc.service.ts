import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTbcDto } from './dto/create-tbc.dto';
import { UpdateTbcDto } from './dto/update-tbc.dto';

@Injectable()
export class TbcService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tbc.findMany({
      select: {
        id: true,
        name: true,
        user: true,
        password: false,
        link: true,
        client: true,
        client_id: true,
        not_required_license: true,
        cod_system_context: true,
        coligate_context: true,
        branch_context: true,
        level_education_context: true,
        user_context: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.tbc.findUnique({
      select: {
        id: true,
        name: true,
        user: true,
        password: false,
        link: true,
        client: {
          select: {
            id: true,
            name: true,
            link_crm: true,
          },
        },
        client_id: true,
        not_required_license: true,
        cod_system_context: true,
        coligate_context: true,
        branch_context: true,
        level_education_context: true,
        user_context: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
      where: { id },
    });
  }

  async create(createTbcDto: CreateTbcDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existTbc = await tx.tbc.findUnique({
          where: { link: createTbcDto.link },
          select: { link: true },
        });

        if (existTbc) {
          throw new ConflictException('Já existe uma TBC com este link.');
        }

        return tx.tbc.create({
          data: {
            ...createTbcDto,
          },
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Já existe uma TBC com este link.');
        }
      }
      throw error;
    }
  }

  async update(id: string, updatedTbcDto: UpdateTbcDto) {
    const tbc = await this.findOne(id);

    if (updatedTbcDto.link && updatedTbcDto.link !== tbc.link) {
      const existTbc = await this.prisma.tbc.findUnique({
        where: { link: updatedTbcDto.link },
        select: { link: true },
      });
      if (existTbc) {
        throw new ConflictException('Já existe uma TBC com este link.');
      }
    }

    const updateData = { ...updatedTbcDto };

    return await this.prisma.tbc.update({
      where: { id: tbc.id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const tbc = await this.prisma.tbc.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!tbc) {
      throw new NotFoundException('TBC não encontrado.');
    }

    return this.prisma.tbc.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}

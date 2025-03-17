import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existClient = await tx.client.findUnique({
          where: { id: createClientDto.link_crm },
          select: { link_crm: true },
        });

        if (existClient) {
          throw new ConflictException('Já existe um cliente com este CRM.');
        }

        return tx.client.create({
          data: {
            ...createClientDto,
          },
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Já existe um cliente com este CRM.');
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.client.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        link_crm: true,
        site: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.client.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    if (
      updateClientDto.link_crm &&
      updateClientDto.link_crm !== client.link_crm
    ) {
      const existClient = await this.prisma.client.findUnique({
        where: { link_crm: updateClientDto.link_crm },
        select: { link_crm: true },
      });
      if (existClient) {
        throw new ConflictException('Já existe um cliente com este CRM.');
      }
    }

    const updateData = { ...updateClientDto };

    return await this.prisma.client.update({
      where: { id: client.id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return this.prisma.client.delete({ where: { id } });
  }

  async findAllWithDeleted() {
    return await this.prisma.findWithDeleted({
      omit: { password: true },
    });
  }
}

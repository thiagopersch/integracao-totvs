import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TbcController } from './tbc.controller';
import { TbcService } from './tbc.service';

@Module({
  imports: [PrismaModule],
  controllers: [TbcController],
  providers: [TbcService],
})
export class TbcModule {}

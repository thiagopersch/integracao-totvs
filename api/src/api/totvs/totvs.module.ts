import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TbcService } from '../tbc/tbc.service';
import { TotvsController } from './totvs.controller';
import { TotvsService } from './totvs.service';

@Module({
  imports: [HttpModule],
  controllers: [TotvsController],
  providers: [TotvsService, TbcService],
})
export class TotvsModule {}

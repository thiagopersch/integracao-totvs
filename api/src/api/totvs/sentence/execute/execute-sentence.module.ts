import { Module } from '@nestjs/common';
import { TbcService } from 'src/api/tbc/tbc.service';
import { ExecuteSentenceController } from './execute-sentence.controller';
import { ExecuteSentenceService } from './execute-sentence.service';

@Module({
  controllers: [ExecuteSentenceController],
  providers: [ExecuteSentenceService, TbcService],
})
export class ExecuteSentenceModule {}

import { Module } from '@nestjs/common';
import { ExecuteSentenceController } from './execute-sentence.controller';
import { ExecuteSentenceService } from './execute-sentence.service';

@Module({
  controllers: [ExecuteSentenceController],
  providers: [ExecuteSentenceService],
})
export class ExecuteSentenceModule {}

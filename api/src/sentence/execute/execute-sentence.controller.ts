import { Controller, Get, Query } from '@nestjs/common';
import { ExecuteSentenceService } from './execute-sentence.service';

@Controller('sentence/execute')
export class ExecuteSentenceController {
  constructor(
    private readonly executeSentenceService: ExecuteSentenceService,
  ) {}

  @Get()
  async executeSentence(
    @Query('codColigada') codColigada: string,
    @Query('codSistema') codSistema: string,
    @Query('codSentenca') codSentenca: string,
    @Query('parameters') parameters: string,
    @Query('username') username: string,
    @Query('password') password: string,
    @Query('tbc') tbc: string,
  ) {
    return await this.executeSentenceService.performSentence(
      codColigada,
      codSistema,
      codSentenca,
      parameters,
      username,
      password,
      tbc,
    );
  }
}

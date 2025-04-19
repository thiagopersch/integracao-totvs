import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TotvsService } from './totvs.service';

@Controller('totvs')
export class TotvsController {
  constructor(private readonly totvsService: TotvsService) {}

  @Get('get-schema')
  async getSchema(
    @Query('dataServerName') dataServerName: string,
    @Query('tbcId') tbcId: string,
    @Query('contexto') contexto: string,
  ) {
    const result = await this.totvsService.getSchema(
      dataServerName,
      tbcId,
      contexto,
    );

    return result;
  }

  @Get('read-view')
  async readView(
    @Query('dataServerName') dataServerName: string,
    @Query('filtro') filtro: string,
    @Query('contexto') contexto: string,
    @Query('tbcId') tbcId: string,
  ) {
    const result = await this.totvsService.readView(
      dataServerName,
      filtro,
      contexto,
      tbcId,
    );

    return result;
  }

  @Get('read-record')
  async readRecord(
    @Query('dataServerName') dataServerName: string,
    @Query('primaryKey') primaryKey: string,
    @Query('contexto') contexto: string,
    @Query('tbcId') tbcId: string,
  ) {
    return await this.totvsService.readRecord(
      dataServerName,
      primaryKey,
      contexto,
      tbcId,
    );
  }

  @Post('save-record')
  async saveRecord(
    @Body('dataServerName') dataServerName: string,
    @Body('xml') xml: string,
    @Body('contexto') contexto: string,
    @Body('tbcId') tbcId: string,
  ) {
    return await this.totvsService.saveRecord(
      dataServerName,
      xml,
      contexto,
      tbcId,
    );
  }
}

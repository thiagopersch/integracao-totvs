import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTbcDto } from './dto/create-tbc.dto';
import { UpdateTbcDto } from './dto/update-tbc.dto';
import { TbcService } from './tbc.service';

@Controller('tbc')
export class TbcController {
  constructor(private readonly tbcService: TbcService) {}

  @Get()
  findAll() {
    return this.tbcService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tbcService.findOne(id);
  }

  @Post()
  create(@Body() CreateTbcDto: CreateTbcDto) {
    return this.tbcService.create(CreateTbcDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateTbcDto: UpdateTbcDto) {
    return this.tbcService.update(id, UpdateTbcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tbcService.remove(id);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateTbcDto } from './create-tbc.dto';

export class UpdateTbcDto extends PartialType(CreateTbcDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateTotvDto } from './create-totv.dto';

export class UpdateTotvDto extends PartialType(CreateTotvDto) {}

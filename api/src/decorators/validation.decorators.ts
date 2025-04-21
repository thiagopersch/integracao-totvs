import { applyDecorators } from '@nestjs/common';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export function IsRequiredString(maxLength: number) {
  return applyDecorators(IsNotEmpty(), IsString(), MaxLength(maxLength));
}

export function IsRequiredNumber(maxLength: number) {
  return applyDecorators(
    IsNotEmpty(),
    IsNumber({ allowNaN: false }),
    Max(maxLength),
  );
}

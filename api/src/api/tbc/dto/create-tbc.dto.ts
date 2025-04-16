import { IsBoolean } from 'class-validator';
import {
  IsRequiredNumber,
  IsRequiredString,
} from 'src/decorators/validation.decorators';

export class CreateTbcDto {
  @IsRequiredString(255)
  client_id: string;

  @IsRequiredString(255)
  name: string;

  @IsRequiredString(255)
  link: string;

  @IsRequiredString(50)
  user: string;

  @IsRequiredString(50)
  password: string;

  @IsBoolean()
  not_required_license: boolean;

  @IsRequiredNumber(5)
  coligate_context: number;

  @IsRequiredNumber(5)
  branch_context: number;

  @IsRequiredNumber(5)
  level_education_context: number;

  @IsRequiredString(5)
  cod_system_context: string;

  @IsRequiredString(50)
  user_context: string;

  @IsBoolean()
  status: boolean;
}

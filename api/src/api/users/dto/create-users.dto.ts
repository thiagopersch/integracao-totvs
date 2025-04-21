import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'Email inválido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  @MaxLength(30, { message: 'A senha deve ter no máximo 30 caracteres.' })
  password: string;

  @IsBoolean({ message: 'O status deve ser um verdadeiro ou falso.' })
  change_password: boolean;
  @IsBoolean({ message: 'O status deve ser um verdadeiro ou falso.' })
  status: boolean;
}

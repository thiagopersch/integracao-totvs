import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsOptional()
  @IsString({ message: 'A senha atual deve ser uma string.' })
  @MinLength(8, { message: 'A senha atual deve ter no mínimo 8 caracteres.' })
  @MaxLength(30, { message: 'A senha atual deve ter no máximo 30 caracteres.' })
  currentPassword?: string;

  @IsNotEmpty({ message: 'A nova senha é obrigatória.' })
  @IsString({ message: 'A nova senha deve ser uma string.' })
  @MinLength(8, { message: 'A nova senha deve ter no mínimo 8 caracteres.' })
  @MaxLength(30, { message: 'A nova senha deve ter no máximo 30 caracteres.' })
  newPassword: string;
}

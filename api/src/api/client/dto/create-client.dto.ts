import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClientDto {
  image?: string;

  @IsNotEmpty({ message: 'O campo é obrigatório.' })
  @IsString({ message: 'O campo deve ser uma string.' })
  @MaxLength(255, { message: 'O campo deve ter no máximo 255 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'O campo é obrigatório.' })
  @IsString({ message: 'O campo deve ser uma string.' })
  @MaxLength(255, { message: 'O campo deve ter no máximo 255 caracteres.' })
  link_crm: string;

  @IsNotEmpty({ message: 'O campo é obrigatório.' })
  @IsString({ message: 'O campo deve ser uma string.' })
  @MaxLength(255, { message: 'O campo deve ter no máximo 255 caracteres.' })
  site: string;

  @IsBoolean({ message: 'O status deve ser um verdadeiro ou falso.' })
  status: boolean;
}

export class CreateUserDto {
  id?: string;
  name: string;
  email: string;
  password: string;
  change_password: boolean;
  status: boolean;
}

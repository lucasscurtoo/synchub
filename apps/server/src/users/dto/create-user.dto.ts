import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  status: string;

  @IsString()
  profesionalRole: string;

  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  organization: string;

  @IsString()
  profilePicture: string;
}

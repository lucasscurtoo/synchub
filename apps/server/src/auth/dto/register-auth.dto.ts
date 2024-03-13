import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
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

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  organization: string;

  @IsString()
  profilePicture: string;
}

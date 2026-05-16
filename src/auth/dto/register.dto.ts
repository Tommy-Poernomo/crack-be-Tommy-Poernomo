import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Format email tidak valid!' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong!' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Kata sandi minimal harus 6 karakter!' })
  @IsNotEmpty({ message: 'Kata sandi tidak boleh kosong!' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong!' })
  name: string;

  @IsEnum(['ADMIN', 'TEACHER', 'STUDENT'], { message: 'Role tidak valid!' })
  @IsOptional()
  role?: 'ADMIN' | 'TEACHER' | 'STUDENT';
}
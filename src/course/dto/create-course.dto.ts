import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Judul kursus minimal 5 karakter' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;
}
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateLessonDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Judul materi minimal 3 karakter' })
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
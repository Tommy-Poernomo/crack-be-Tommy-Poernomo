import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty({ message: 'Judul bab materi tidak boleh kosong' })
  @MinLength(3, { message: 'Judul materi terlalu pendek (minimal 3 karakter)' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Isi konten materi tidak boleh kosong' })
  content: string;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
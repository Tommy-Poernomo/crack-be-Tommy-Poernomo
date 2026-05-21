import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty({ message: 'Judul tugas tidak boleh kosong' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Instruksi tugas wajib diisi' })
  instruction: string;

  @IsDateString({}, { message: 'Format tenggat waktu (deadline) salah' })
  dueDate: string;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
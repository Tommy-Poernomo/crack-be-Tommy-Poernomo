import { Controller, Post, Put, Get, Delete, Patch, Body, UseGuards, Request, Param, ParseIntPipe, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Mengambil kursus KHUSUS milik guru yang sedang login
  @UseGuards(AuthGuard('jwt'))
  @Get('my-courses') // diberi route spesifik agar tidak tabrakan dengan get publik siswa
  async findMyCourses(@Request() req) {
    // req.user.userId didapat dari token JWT guru
    return this.courseService.findCoursesByTeacher(req.user.userId);
  }

  //Membuat kursus baru, hanya untuk guru yang sedang login
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateCourseDto, @Request() req) {
    // Cek Role: Hanya TEACHER atau ADMIN yang boleh buat kursus
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Hanya pengajar yang dapat membuat kursus!');
    }
    return this.courseService.create(dto, req.user.userId);
  }

  // Mengambil semua kelas (untuk publik/siswa)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  // Mengedit kursus dengan proteksi/validasi kepemilikan
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateCourseDto,
  @Request() req,
  ) {
  const result = await this.courseService.update(id, req.user.userId, dto);
  if (!result) throw new NotFoundException('Kursus tidak ditemukan');
  return { message: 'Kursus berhasil diperbarui', data: result };
  }
  
  // Menghapus kursus secara aman dengan validasi kepemilikan dan penanganan error yang lebih baik
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const result = await this.courseService.remove(id, req.user.userId);
    if (result === null) {
      throw new NotFoundException(`Kursus dengan ID ${id} tidak ditemukan`);
    }
    return { message: 'Kursus berhasil dihapus' };
  }
}
import { Controller, Post, Put, Get, Delete, Patch, Body, UseGuards, Request, Param, ParseIntPipe, ForbiddenException, NotFoundException, Req, Query } from '@nestjs/common';
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

@UseGuards(AuthGuard('jwt'))
  @Get(':id/students')
  async getCourseStudents(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    // req.user.userId didapat dari token JWT guru yang sedang aktif
    return this.courseService.findCourseStudents(id, req.user.userId);
  }

  // Mengambil semua kelas (untuk publik/siswa)
  //@UseGuards(AuthGuard('jwt')) dimatikan agar siswa/publik bisa lihat semua kursus tanpa harus login, tapi tetap bisa lihat kursus miliknya jika login
  @Get()
  async findAll(@Query('search') search?: string) {
    // Meneruskan parameter kata kunci pencarian dari query url ke dalam service
    return this.courseService.findAll(search);
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
  // Mengambil detail SATU kursus berdasarkan ID
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const course = await this.courseService.findOne(id); // Pastikan fungsi findOne(id) ini sudah ada di course.service.ts
    if (!course) throw new NotFoundException(`Kursus dengan ID ${id} tidak ditemukan`);
    return course;
  }
}
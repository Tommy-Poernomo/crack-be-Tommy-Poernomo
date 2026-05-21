import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('lessons') // Menentukan rute dasar '/lessons' jamak sesuai tembakan FE kita
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

@UseGuards(AuthGuard('jwt'))
  @Get()
  findByCourse(@Query('courseId') courseId: string) { // <-- Ambil sebagai string terlebih dahulu untuk menghindari crash tipe data
    return this.lessonService.findByCourse(Number(courseId)); // <-- Ubah ke Angka saat dikirim ke Service Prisma
  }

@UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateLessonDto: UpdateLessonDto // <-- GUNAKAN VALIDATOR DTO
  ) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.lessonService.remove(id);
    return { message: 'Materi berhasil dihapus' };
  }
}
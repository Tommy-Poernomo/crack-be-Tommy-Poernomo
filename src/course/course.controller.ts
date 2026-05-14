import { Controller, Post, Get, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

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
  @Get()
  findAll() {
    return this.courseService.findAll();
  }
}
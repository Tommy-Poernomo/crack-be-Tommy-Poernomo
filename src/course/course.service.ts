import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCourseDto, teacherId: number) {
    return this.prisma.course.create({
      data: {
        //...dto,
        title: dto.title,
        description: dto.description,
        thumbnail: dto.thumbnail,
        teacherId: teacherId, // Diambil dari token user yang sedang login
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        teacher: {
          select: { name: true, email: true } // Menampilkan info pengajar
        }
      }
    });
  }

  async remove(id: number, teacherId: number) {
  // 1. Cari kursusnya dulu
  const course = await this.prisma.course.findUnique({
    where: { id },
  });

  if (!course) throw new Error('Kursus tidak ditemukan');
  //if (!course) return null; // Beri sinyal kursus tidak ada

  // 2. Pastikan yang menghapus adalah pemiliknya
  if (course.teacherId !== teacherId) {
    throw new Error('Kamu tidak punya akses menghapus kursus ini');
//throw new ForbiddenException('Kamu tidak punya akses menghapus kursus ini');
  }

  return this.prisma.course.delete({
    where: { id },
  });
}
async update(id: number, teacherId: number, dto: UpdateCourseDto) {
  const course = await this.prisma.course.findUnique({
    where: { id },
  });

  if (!course) return null;

  if (course.teacherId !== teacherId) {
    throw new ForbiddenException('Kamu bukan pemilik kursus ini');
  }

  return this.prisma.course.update({
    where: { id },
    data: dto,
  });
}
}
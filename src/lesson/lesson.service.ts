import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {} // Inject Prisma

  async create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: {
        title: dto.title,
        content: dto.content,
        courseId: dto.courseId,
      },
    });
  }

async findByCourse(courseId: number) {
    return this.prisma.lesson.findMany({
      where: {
        courseId: courseId, // Mencari baris bab yang punya courseId sama dengan ID kelas ini
      },
      orderBy: {
        createdAt: 'asc', // Menyusun otomatis urutan dari BAB 1, BAB 2, dst.
      },
    });
  }

  async update(id: number, dto: { title?: string; content?: string }) {
    return this.prisma.lesson.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
  
}
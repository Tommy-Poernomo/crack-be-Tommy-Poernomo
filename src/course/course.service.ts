import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

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
}
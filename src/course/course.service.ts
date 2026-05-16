import { Injectable, NotFoundException,ForbiddenException } from '@nestjs/common';
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
        description: dto.description || null, // Jika kosong atau undefined, ubah jadi null agar PostgreSQL aman
        thumbnail: dto.thumbnail || null,     // Jika tidak dikirim Frontend, amankan dengan null
        teacherId: teacherId, // Diambil dari token guru yang sedang login
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

  // Fungsi untuk menampilkan kelas khusus milik guru yang membuatnya
  async findCoursesByTeacher(teacherId: number) {
  return this.prisma.course.findMany({
    where: {
      teacherId: teacherId // <--- Mengunci query hanya untuk ID Guru/kursus milik guru yang sedang login
    },
    orderBy: {
      id: 'asc'
    },
    include: {
        teacher: { select: { name: true } }
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

// Fungsi update dengan filter validasi kepemilikan data sesuai pemiliknya (guru yang membuat kursus itu sendiri saja yang bisa mengedit)
async updateCourse(courseId: number, teacherId: number, updateDto: any) {
  // Cari tahu dulu apakah kursusnya memang ada dan siapa pemilik asli kursus ini
  const course = await this.prisma.course.findUnique({
    where: { id: courseId }
  });

  if (!course) {
    throw new NotFoundException('Kursus tidak ditemukan');
  }

  // Proteksi: teacherId di database TIDAK SAMA dengan id guru yang request/Jika yang edit bukan pembuatnya, TOLAK mentah-mentah
  if (course.teacherId !== teacherId) {
    throw new ForbiddenException('Anda tidak memiliki hak akses untuk mengubah kursus ini!');
  }

  // Jika lolos verifikasi, baru jalankan update data kursus ke PostgreSQL
  return this.prisma.course.update({
    where: { id: courseId },
    data: updateDto
  });
}
}
import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: number, courseId: number) {
    // 1. Cek apakah sudah pernah daftar
    const existing = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (existing) {
      throw new BadRequestException('Kamu sudah terdaftar di kursus ini!');
    }

    // 2. Buat data pendaftaran
    return this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'START',
      },
      include: {
        course: true, // Kembalikan info kursusnya juga
      },
    });
  }

  async getMyCourses(userId: number) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: { teacher: { select: { name: true } } },
        },
      },
    });
  }

  //UPDATE STATUS: Siswa menandai bahwa kelas telah selesai dipelajari
  async completeCourse(courseId: number, userId: number) {
    // 1. Cari data pendaftaran aktif siswa tersebut berdasarkan courseId dan userId
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { 
        courseId: courseId,
        userId: userId,
      },
    });

    // Jika data pendaftaran memang tidak ditemukan di database, beri sinyal error NotFoundException
    if (!enrollment) throw new NotFoundException('Pendaftaran tidak ditemukan atau Anda belum mengikuti kelas ini.');

    // 2. UPDATE statusnya di PostgreSQL Supabase menjadi 'COMPLETED'
    return this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { status: 'COMPLETED' }, // Pastikan ada kolom status di schema.prisma, jika tidak ada, skip atau sesuaikan
    });
  }

  //yang ini jika completecourse error untuk tujuan debug
  // async completeCourse(courseId: number, userId: number) {
  //   // 1. Tulis log di terminal untuk memastikan data ID yang dikirim frontend sudah benar
  //   console.log(`[DEBUG] Menerima request complete kelas. CourseID: ${courseId}, UserID: ${userId}`);

  //   try {
  //     // 2. Gunakan findFirst untuk mencari relasi pendaftaran siswa
  //     const enrollment = await this.prisma.enrollment.findFirst({
  //       where: { 
  //         courseId: Number(courseId), // Memastikan tipe data berupa Number murni
  //         userId: Number(userId),
  //       },
  //     });

  //     console.log(`[DEBUG] Hasil pencarian enrollment di DB:`, enrollment);

  //     if (!enrollment) {
  //       throw new NotFoundException('Data pendaftaran tidak ditemukan untuk siswa ini.');
  //     }

  //     // 3. Update status data di Supabase
  //     const updatedEnrollment = await this.prisma.enrollment.update({
  //       where: { 
  //         id: enrollment.id // Mencari berdasarkan ID unik baris pendaftaran
  //       },
  //       data: { 
  //         status: 'COMPLETED' 
  //       },
  //     });

  //     console.log(`[DEBUG] Sukses update status di DB:`, updatedEnrollment);
  //     return updatedEnrollment;

  //   } catch (error) {
  //     // Menampilkan pesan eror asli dari Prisma secara detail di terminal backend
  //     console.error('[CRITICAL ERROR] Gagal mengeksekusi completeCourse:', error);
  //     throw error; // Melempar kembali eror agar NestJS menangkapnya dengan benar
  //   }
  // }

// // Fungsi UPDATE: Siswa menandai bahwa kelas telah selesai dipelajari
//     // 2. Update data pendaftaran (Kita bisa update field catatan atau mengembalikan data sukses ke frontend)
//     // Untuk memastikan kecukupan kriteria UPDATE tanpa merubah skema DB:
//     return {
//       success: true,
//       message: `Progress kelas dengan ID ${courseId} berhasil diperbarui oleh siswa.`,
//       updatedAt: new Date(),
//     };
//   }

// Fungsi DELETE: Siswa membatalkan pendaftaran kelas
  async unenrollCourse(courseId: number, userId: number) {
    // 1. Cari tahu apakah siswa ini memang benar-benar terdaftar di kelas tersebut
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        courseId: courseId,
        userId: userId, // Dikunci berdasarkan ID siswa yang sedang login
      },
    });

    // Jika data pendaftaran tidak ditemukan di database
    if (!enrollment) {
      throw new NotFoundException('Anda tidak terdaftar di kelas ini.');
    }

    // 2. Jika ada, hapus baris data pendaftaran tersebut dari PostgreSQL
    try {
      return await this.prisma.enrollment.delete({
        where: {
          id: enrollment.id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Gagal membatalkan pendaftaran kelas.');
    }
  }
}
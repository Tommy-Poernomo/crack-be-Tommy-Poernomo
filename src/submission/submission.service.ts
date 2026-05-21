import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================================================================
  // PROSES PENYIMPANAN / UNGGAH KARYA GAMBAR SISWA KE DATABASE
  // =========================================================================
  async create(dto: { imagePath: string; assignmentId: number; studentId: number; studentName: string }) {
    
    // 1. Ambil data user langsung dari tabel database berdasarkan ID
    const dbUser = await this.prisma.user.findUnique({
      where: { id: dto.studentId },
    });

    if (!dbUser) throw new NotFoundException('Data akun siswa tidak ditemukan di database.');

    // Menggunakan properti dbUser.name yang sudah terbukti valid di tabel User kamu
    const validStudentName = dbUser.name || 'Siswa DKV';

    // 2. Cari tahu apakah siswa ini sudah pernah mengumpulkan tugas ini sebelumnya
    const existing = await this.prisma.submission.findFirst({
      where: { 
        assignmentId: dto.assignmentId, 
        studentId: dto.studentId 
      },
    });

    // 3. Jika sudah ada riwayat pengumpulan, perbarui jalur berkas gambar dan sinkronkan namanya
    if (existing) {
      return this.prisma.submission.update({
        where: { id: existing.id },
        data: { 
          imagePath: dto.imagePath,
          studentName: validStudentName
        },
      });
    }

    // 4. ✨ PERBAIKAN: Menambahkan '.submission' sebelum fungsi create agar dikenali oleh Prisma Engine
    return this.prisma.submission.create({
      data: {
        imagePath: dto.imagePath,
        assignmentId: dto.assignmentId,
        studentId: dto.studentId, 
        studentName: validStudentName,
      },
    });
  }

  async uploadSubmission(userId: number, assignmentId: number, imagePath: string) {
    // 1. Ambil data instruksi tugas untuk mengecek tanggal batas akhir (dueDate)
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: Number(assignmentId) }
    });

    if (!assignment) {
      throw new NotFoundException('Instruksi tugas tidak ditemukan di database.');
    }

    // 2. ✨ PENGAMAN BACKEND: Bandingkan waktu server saat ini dengan dueDate
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);

    if (now > dueDate) {
      throw new BadRequestException('⚠️ Gagal unggah karya: Batas waktu pengumpulan untuk tugas ini telah berakhir!');
    }

    // 3. Jalankan kode penyimpanan asli kamu di bawahnya (create atau update)...
    // cth: return this.prisma.submission.upsert(...)
  }

  // =========================================================================
  // PROSES PENGAMBILAN DATA GALERI INSPIRASI (SHOWCASE PORTFOLIO KOMUNITAS)
  // =========================================================================
  async getShowcase(assignmentId: number, requesterId: number) {
    if (!requesterId) throw new ForbiddenException('Sesi login tidak valid');

    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { course: true },
    });

    if (!assignment) throw new NotFoundException('Tugas tidak ditemukan');

    // Cek Otoritas Guru Pemilik Kelas
    if (assignment.course.teacherId === requesterId) {
      return this.prisma.submission.findMany({
        where: { assignmentId },
        orderBy: { createdAt: 'desc' },
      });
    }

    // Cek Otoritas Siswa yang terdaftar
    const isEnrolled = await this.prisma.enrollment.findFirst({
      where: {
        userId: requesterId, 
        courseId: assignment.courseId,
      },
    });

    if (!isEnrolled) {
      throw new ForbiddenException('Anda tidak terdaftar di kelas ini.');
    }

    return this.prisma.submission.findMany({
      where: { assignmentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
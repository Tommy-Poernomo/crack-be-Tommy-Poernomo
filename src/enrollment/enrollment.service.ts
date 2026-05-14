import { Injectable, BadRequestException } from '@nestjs/common';
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
}
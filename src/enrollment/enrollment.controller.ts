import { Controller, Delete, Patch, Param, ParseIntPipe, Post, Get, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async enroll(@Body('courseId') courseId: number, @Request() req) {
    return this.enrollmentService.enroll(req.user.userId, courseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-courses')
  async getMyCourses(@Request() req) {
    return this.enrollmentService.getMyCourses(req.user.userId);
  }

  // Route Update Status
   @UseGuards(AuthGuard('jwt'))
  @Patch(':courseId/complete')
  async complete(@Param('courseId', ParseIntPipe) courseId: number, @Request() req) {
    // Ambil ID secara fleksibel (antisipasi jika di payload JWT kamu disimpan dengan nama 'id' atau 'userId')
    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      throw new UnauthorizedException('Identitas siswa tidak ditemukan di dalam token akses.');
    }
    return this.enrollmentService.completeCourse(courseId, req.user.userId);
  }

  // Route Delete Enrollment (Unenroll)
@UseGuards(AuthGuard('jwt'))
  @Delete(':courseId/unenroll')
  async unenroll(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Request() req,
  ) {
    // req.user.userId diekstrak dari token JWT milik siswa yang sedang aktif
    await this.enrollmentService.unenrollCourse(courseId, req.user.userId);
    return { message: 'Berhasil keluar dan membatalkan pendaftaran kelas.' };
  }
}
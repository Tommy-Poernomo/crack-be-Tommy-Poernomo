import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
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
}
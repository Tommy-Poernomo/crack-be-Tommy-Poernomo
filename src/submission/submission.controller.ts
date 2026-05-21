import { Controller, Post, Get, UseGuards, UseInterceptors, UploadedFile, Body, Query, Req, BadRequestException } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

@UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, resolve(process.cwd(), 'uploads'));
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `DKV-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Format file harus berupa JPG atau PNG!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('assignmentId') assignmentId: string,
    @Req() req: any,
  ) {
    if (!file) throw new BadRequestException('Berkas gambar karya belum dilampirkan');

    // 1. Ambil ID siswa dari token yang sudah teruji valid
    const extractedStudentId = req.user?.id || req.user?.userId || req.user?.sub;
    if (!extractedStudentId) {
      throw new BadRequestException('Sesi token tidak sah, silakan login ulang.');
    }

    // 2. Kirim data ke service untuk diproses lebih lanjut
    return this.submissionService.create({
      imagePath: `/uploads/${file.filename}`,
      assignmentId: Number(assignmentId),
      studentId: Number(extractedStudentId),
      studentName: '', // Service mencari nama aslinya di database
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('showcase')
  getShowcase(@Query('assignmentId') assignmentId: string, @Req() req: any) {
    // 🛠️ PERBAIKAN KRUSIAL: Berlaku sama untuk query data showcase galeri kelas
    const extractedStudentId = req.user?.id || req.user?.userId || req.user?.sub;
    return this.submissionService.getShowcase(Number(assignmentId), Number(extractedStudentId));
  }
}
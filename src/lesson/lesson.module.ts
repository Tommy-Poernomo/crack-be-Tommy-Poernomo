import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule

@Module({
  imports: [PrismaModule], // <-- Masukkan ke dalam array imports
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
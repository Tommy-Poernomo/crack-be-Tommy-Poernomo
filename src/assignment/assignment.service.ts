import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAssignmentDto) {
    return this.prisma.assignment.create({
      data: {
        title: dto.title,
        instruction: dto.instruction,
        dueDate: new Date(dto.dueDate),
        courseId: dto.courseId,
      },
    });
  }

  async findByCourse(courseId: number) {
    return this.prisma.assignment.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.assignment.findUnique({
      where: { id },
    });
  }
}
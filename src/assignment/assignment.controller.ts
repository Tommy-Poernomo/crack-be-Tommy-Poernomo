import { Controller, Post, Get, Body, Param, Query, UseGuards, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService, private readonly prisma: PrismaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findByCourse(@Query('courseId', ParseIntPipe) courseId: number) {
    return this.assignmentService.findByCourse(courseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.findOne(id);
  }

  // 📝 ENDPOINT EDIT TUGAS (Untuk mengubah Batas Waktu / Instruksi dan Sudah Diperkuat Validasi Tipe Datanya)
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateData: { title?: string; instruction?: string; dueDate?: string }
  ) {
    // Siapkan wadah data baru
    const dataToUpdate: any = {};
    
    if (updateData.title) dataToUpdate.title = updateData.title;
    if (updateData.instruction) dataToUpdate.instruction = updateData.instruction;
    
    // ✨ PENTING: Jika ada pembaruan tanggal, bungkus string tersebut menjadi objek Date asli untuk Prisma
    if (updateData.dueDate) {
      dataToUpdate.dueDate = new Date(updateData.dueDate);
    }

    return this.prisma.assignment.update({
      where: { id: Number(id) }, // Memastikan ID dibaca sebagai angka integer
      data: dataToUpdate,
    });
  }

  // ❌ ENDPOINT HAPUS TUGAS
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.assignment.delete({
      where: { id: Number(id) },
    });
  }
}
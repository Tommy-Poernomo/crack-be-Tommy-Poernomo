import { Injectable, ConflictException, UnauthorizedException, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Cek apakah email sudah terdaftar
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new ConflictException('Email sudah digunakan');
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Simpan ke Database
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: dto.role,
      },
    });

    return { message: 'User berhasil didaftarkan', userId: user.id };
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Kredensial salah');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        name: user.name,
        role: user.role
      }
    };
  }

  //Fungsi Penarik Data User untuk ditampilkan di Admin
  async findAllUsers() {
  return this.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    });
  }

  // 1. Fungsi UPDATE: Mengubah data profile Guru
  async updateTeacher(id: number, data: { name: string; email: string }) {
    // Memastikan user-nya ada di database
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Akun pengajar tidak ditemukan');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  // 2. Fungsi DELETE: Menghapus akun Guru dari sistem
  async deleteTeacher(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Akun pengajar tidak ditemukan');
    }

    // Menghapus data user (relasi kursus akan ikut terhapus jika di schema.prisma dipasang onDelete: Cascade)
    await this.prisma.user.delete({ where: { id } });
    
    return {
      success: true,
      message: 'Akun pengajar berhasil dihapus dari database sistem.',
    };
  }

  // ✨ Update Nama dan Password Profil, Proses filter ketat data profil masuk
async updateProfile(userId: any, updateData: { name?: string; password?: string }) {
    // Jika userId terdeteksi, paksa konversi ke tipe data Number murni
    const parsedUserId = userId ? Number(userId) : NaN;

    if (!parsedUserId || isNaN(parsedUserId)) {
      throw new BadRequestException('⚠️ Gagal memperbarui profil: ID Pengguna tidak terdeteksi atau tidak valid di dalam token sesi Anda.');
    }

    const dataToUpdate: any = {};

    if (updateData.name && updateData.name.trim() !== '') {
      dataToUpdate.name = updateData.name.trim();
    }

    if (updateData.password && updateData.password.trim() !== '') {
      dataToUpdate.password = updateData.password.trim(); 
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: parsedUserId }, // Gunakan ID yang sudah divalidasi angka
        data: dataToUpdate,
      });

      return {
        message: '🎉 Profil berhasil diperbarui!',
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      };
    } catch (dbError) {
      console.error("Gagal eksekusi Prisma Update Profile:", dbError);
      throw new InternalServerErrorException('Gagal menyimpan perubahan profil ke database.');
    }
  }
}
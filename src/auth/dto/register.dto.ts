// src/auth/dto/register.dto.ts
export class RegisterDto {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'TEACHER' | 'STUDENT'; // Opsional, defaultnya STUDENT di Prisma
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join, resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.enableCors({
  origin: '*', // Mengizinkan localhost:3001 saat dev, dan otomatis aman saat naik ke Vercel nanti
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Menghapus field yang tidak ada di DTO
    forbidNonWhitelisted: true, // Error jika mengirim field liar
    transform: true, // Mengubah tipe data secara otomatis
  }));

// 🛠️ GERBANG BERKAS STATIS (Paling Krusial): 
  // Membuka akses folder fisik 'uploads' ke alamat URL http://localhost:3000/uploads
  app.use('/uploads', express.static(resolve(process.cwd(), 'uploads')));

  // Menyalakan server backend di port 3000 atau port dinamis yang disediakan oleh platform hosting (seperti Vercel)
  await app.listen(process.env.PORT || 3000); // Membaca port dinamis dari server deployment
console.log(`🚀 Server Backend LMS DKV berjalan di: http://localhost:3000`);
}
bootstrap();

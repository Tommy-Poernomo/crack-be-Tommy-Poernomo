import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  await app.listen(process.env.PORT || 3000); // Membaca port dinamis dari server deployment
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Menghapus field yang tidak ada di DTO
    forbidNonWhitelisted: true, // Error jika mengirim field liar
    transform: true, // Mengubah tipe data secara otomatis
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
